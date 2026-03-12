#!/usr/bin/env python3
"""
Monitor service — следи блога за нови статии и уведомява Telegram бота.
"""

import os
import asyncio
import logging
import json
import aiohttp
from datetime import datetime

logger = logging.getLogger(__name__)

BLOG_API_URL = os.environ.get("BLOG_API_URL", "https://eng.d-dimitrov.eu/api/posts")
CHECK_INTERVAL = int(os.environ.get("CHECK_INTERVAL_SECONDS", "300"))  # 5 мин по подразбиране
SEEN_FILE = "/data/seen_posts.json"


def load_seen() -> set:
    """Зарежда вече видените ID-та от файл."""
    try:
        with open(SEEN_FILE, "r") as f:
            return set(json.load(f))
    except Exception:
        return set()


def save_seen(seen: set):
    """Записва видените ID-та."""
    os.makedirs("/data", exist_ok=True)
    with open(SEEN_FILE, "w") as f:
        json.dump(list(seen), f)


def build_full_text(article: dict) -> str:
    """Сглобява пълния текст на статията от секциите."""
    parts = [article.get("title", "")]
    for section in sorted(article.get("sections", []), key=lambda s: s.get("position", 0)):
        if section.get("title"):
            parts.append(f"\n## {section['title']}")
        if section.get("content"):
            parts.append(section["content"])
    return "\n\n".join(parts)


def get_first_image(article: dict) -> str | None:
    """Взима първото налично изображение от статията."""
    if article.get("images"):
        return article["images"]
    for section in article.get("sections", []):
        if section.get("image_url"):
            return section["image_url"]
    return None


async def fetch_published_posts() -> list:
    """Взима всички публикувани статии от API-то."""
    async with aiohttp.ClientSession() as session:
        async with session.get(BLOG_API_URL, timeout=aiohttp.ClientTimeout(total=15)) as r:
            r.raise_for_status()
            data = await r.json()
            # Само публикуваните (status: true)
            return [p for p in data if p.get("status") is True]


async def monitor_loop(notify_callback):
    """
    Основният цикъл — проверява на всеки CHECK_INTERVAL секунди.
    notify_callback(article) се вика за всяка нова статия.
    """
    logger.info(f"🔍 Стартирам мониторинг на {BLOG_API_URL} (на всеки {CHECK_INTERVAL}с)")
    seen = load_seen()

    # При първо стартиране — маркираме всички съществуващи като видени
    if not seen:
        logger.info("Първо стартиране — маркирам съществуващите статии като видени...")
        try:
            posts = await fetch_published_posts()
            seen = {str(p["id"]) for p in posts}
            save_seen(seen)
            logger.info(f"Маркирани {len(seen)} съществуващи статии.")
        except Exception as e:
            logger.error(f"Грешка при първоначално зареждане: {e}")

    while True:
        await asyncio.sleep(CHECK_INTERVAL)
        try:
            posts = await fetch_published_posts()
            new_posts = [p for p in posts if str(p["id"]) not in seen]

            for post in new_posts:
                logger.info(f"🆕 Нова статия: [{post['id']}] {post['title']}")
                await notify_callback(post)
                seen.add(str(post["id"]))
                save_seen(seen)

        except Exception as e:
            logger.error(f"Грешка при проверка: {e}")
