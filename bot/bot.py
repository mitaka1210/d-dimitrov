#!/usr/bin/env python3
import os
import logging
import asyncio
import httpx
from google import genai
import anthropic
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    Application, CommandHandler, MessageHandler,
    CallbackQueryHandler, ContextTypes, ConversationHandler, filters
)

from monitor import monitor_loop, build_full_text, get_first_image
from publisher import publish_to_platforms, PUBLISHERS
from ai_adapter import adapt_for_all_platforms

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

ALLOWED_USER_ID = int(os.environ.get("TELEGRAM_ALLOWED_USER_ID", "0"))
CHOOSING_MODEL, CHOOSING_TYPE, ENTERING_TOPIC, REVIEWING, CHOOSING_PLATFORMS = range(5)

# Инициализираме Gemini
gemini_client = genai.Client(
    api_key=os.environ.get("GOOGLE_API_KEY"),
    http_options={'api_version': 'v1beta'}
)

def get_anthropic_client():
    """Безопасна инициализация на Anthropic без прокси конфликти."""
    return anthropic.Anthropic(
        api_key=os.environ.get("ANTHROPIC_API_KEY"),
        http_client=httpx.Client(proxies={})
    )

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    if not (ALLOWED_USER_ID == 0 or update.effective_user.id == ALLOWED_USER_ID):
        return ConversationHandler.END
    keyboard = [
        [InlineKeyboardButton("✨ Google Gemini", callback_data="ai_gemini")],
        [InlineKeyboardButton("🧠 Anthropic Claude", callback_data="ai_claude")]
    ]
    await update.message.reply_text("👋 Кой ИИ да генерира съдържанието?", reply_markup=InlineKeyboardMarkup(keyboard))
    return CHOOSING_MODEL

async def model_choice(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.callback_query
    await query.answer()
    context.user_data["selected_ai"] = query.data
    keyboard = [[InlineKeyboardButton("📝 Статия", callback_data="long"), InlineKeyboardButton("⚡ Пост", callback_data="short")]]
    await query.edit_message_text("Избери формат:", reply_markup=InlineKeyboardMarkup(keyboard))
    return CHOOSING_TYPE

async def choose_type(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.callback_query
    await query.answer()
    context.user_data["article_type"] = query.data
    await query.edit_message_text("📌 Напиши тема:")
    return ENTERING_TOPIC

async def enter_topic(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    topic = update.message.text
    ai_choice = context.user_data.get("selected_ai")
    prompt = f"Напиши съдържание на български за: {topic}"
    await update.message.reply_text("⏳ Генерирам...")

    try:
        if ai_choice == "ai_gemini":
            res = await asyncio.to_thread(gemini_client.models.generate_content, model='models/gemini-2.0-flash-lite', contents=prompt)
            text = res.text
        else:
            client_ant = get_anthropic_client()
            res = await asyncio.to_thread(client_ant.messages.create, model="claude-3-5-sonnet-20240620", max_tokens=2000, messages=[{"role": "user", "content": prompt}])
            text = res.content[0].text

        context.user_data["manual_text"] = text
        await update.message.reply_text(text[:4000])
        keyboard = [[InlineKeyboardButton("✅ Публикувай", callback_data="manual_publish"), InlineKeyboardButton("❌ Откажи", callback_data="cancel")]]
        await update.message.reply_text("Харесва ли ти?", reply_markup=InlineKeyboardMarkup(keyboard))
        return REVIEWING
    except Exception as e:
        await update.message.reply_text(f"❌ Грешка: {e}")
        return ConversationHandler.END

async def review_article(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.callback_query
    await query.answer()
    if query.data == "manual_publish":
        await query.edit_message_text("🚀 Публикувам...")
        await publish_to_platforms(["facebook", "instagram", "twitter", "linkedin"], context.user_data["manual_text"], None)
        await query.message.reply_text("✅ Готово!")
    return ConversationHandler.END

def main():
    app = Application.builder().token(os.environ["TELEGRAM_BOT_TOKEN"]).build()
    conv = ConversationHandler(
        entry_points=[CommandHandler("start", start)],
        states={
            CHOOSING_MODEL: [CallbackQueryHandler(model_choice)],
            CHOOSING_TYPE: [CallbackQueryHandler(choose_type)],
            ENTERING_TOPIC: [MessageHandler(filters.TEXT & ~filters.COMMAND, enter_topic)],
            REVIEWING: [CallbackQueryHandler(review_article)],
        },
        fallbacks=[CommandHandler("cancel", lambda u, c: ConversationHandler.END)],
    )
    app.add_handler(conv)
    app.run_polling()

if __name__ == "__main__":
    main()