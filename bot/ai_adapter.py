#!/usr/bin/env python3
"""
AI адаптер — превръща блог статия в подходящо съдържание за всяка платформа.
Използва Google Gemini (v2.0 Flash Lite) с автоматичен резервен вариант Anthropic Claude.
"""

import os
import logging
import httpx
from google import genai
import anthropic

logger = logging.getLogger(__name__)

def _build_article_text(article: dict) -> str:
    """Сглобява текста на статията."""
    parts = [article.get("title", "")]
    sections = article.get("sections", [])
    if isinstance(sections, list):
        for section in sorted(sections, key=lambda s: s.get("position", 0)):
            if section.get("title"):
                parts.append(f"## {section['title']}")
            if section.get("content"):
                parts.append(section["content"])
    return "\n\n".join(parts)

def adapt_for_platform(article: dict, platform: str, article_url: str = "") -> str:
    """Генерира адаптирано съдържание с Gemini и автоматичен fallback към Claude."""
    gemini_key = os.environ.get("GOOGLE_API_KEY")
    anthropic_key = os.environ.get("ANTHROPIC_API_KEY")
    
    article_text = _build_article_text(article)
    link_note = f"\n\nЛинк към пълната статия: {article_url}" if article_url else ""

    prompt = (
        f"Напиши пост за {platform} на български за тази статия:\n"
        f"{article_text}{link_note}\n"
        f"Използвай емоджи и подходящ стил за платформата."
    )

    # --- ПЪРВИ ОПИТ: Google Gemini ---
    if gemini_key:
        try:
            client = genai.Client(api_key=gemini_key, http_options={'api_version': 'v1beta'})
            response = client.models.generate_content(
                model='models/gemini-2.0-flash-lite',
                contents=prompt
            )
            if response and response.text:
                logger.info(f"✅ Успешна адаптация с Gemini за {platform}")
                return response.text
        except Exception as e:
            logger.warning(f"⚠️ Gemini грешка: {e}. Опитвам с Claude...")

    # --- ВТОРИ ОПИТ: Anthropic Claude ---
    if anthropic_key:
        try:
            # Инициализация без проксита, за да се избегне TypeError
            client_ant = anthropic.Anthropic(
                api_key=anthropic_key,
                http_client=httpx.Client(proxies={})
            )
            message = client_ant.messages.create(
                model="claude-3-5-sonnet-20240620",
                max_tokens=1000,
                messages=[{"role": "user", "content": prompt}]
            )
            logger.info(f"✅ Успешна адаптация с Claude за {platform}")
            return message.content[0].text
        except Exception as e:
            logger.error(f"❌ Критична грешка и при двата модела: {e}")
            return f"Грешка при генериране: {str(e)}"

    return "Грешка: Липсват API ключове."

def adapt_for_all_platforms(article: dict, article_url: str = "") -> dict:
    return {p: adapt_for_platform(article, p, article_url) for p in ["facebook", "instagram", "twitter", "linkedin"]}