"""
AI адаптер — превръща блог статия в подходящо съдържание за всяка платформа.
"""

import os
import anthropic


def _build_article_text(article: dict) -> str:
    """Сглобява текста на статията."""
    parts = [article.get("title", "")]
    for section in sorted(article.get("sections", []), key=lambda s: s.get("position", 0)):
        if section.get("title"):
            parts.append(f"## {section['title']}")
        if section.get("content"):
            parts.append(section["content"])
    return "\n\n".join(parts)


def adapt_for_platform(article: dict, platform: str, article_url: str = "") -> str:
    """
    Генерира адаптирано съдържание за конкретна платформа.
    """
    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
    article_text = _build_article_text(article)
    link_note = f"\n\nЛинк към пълната статия: {article_url}" if article_url else ""

    prompts = {
        "facebook": (
            "Ти си социален медия мениджър. Напиши ангажиращ Facebook пост (200-400 думи) "
            "базиран на тази блог статия. Добави емоджи, зададен въпрос към аудиторията и "
            f"линка накрая. Пиши на български.\n\nСтатия:\n{article_text}{link_note}"
        ),
        "instagram": (
            "Ти си Instagram копирайтър. Напиши атрактивен Instagram caption (150-220 думи) "
            "базиран на тази статия. Добави много емоджи, хаштагове (8-12) накрая. "
            f"Пиши на български.\n\nСтатия:\n{article_text}{link_note}"
        ),
        "twitter": (
            "Ти си Twitter/X копирайтър. Напиши закачлив туит МАКСИМУМ 270 символа "
            "базиран на тази статия. Добави 1-2 хаштага и линка. "
            f"Пиши на български.\n\nСтатия:\n{article_text}{link_note}"
        ),
        "linkedin": (
            "Ти си LinkedIn копирайтър. Напиши професионален LinkedIn пост (250-400 думи) "
            "базиран на тази статия. Структуриран, с поуки и призив за действие. "
            f"Пиши на български.\n\nСтатия:\n{article_text}{link_note}"
        ),
    }

    message = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=1000,
        messages=[{"role": "user", "content": prompts.get(platform, prompts["facebook"])}]
    )
    return message.content[0].text


def adapt_for_all_platforms(article: dict, article_url: str = "") -> dict:
    """Генерира съдържание за всички 4 платформи."""
    results = {}
    for platform in ["facebook", "instagram", "twitter", "linkedin"]:
        results[platform] = adapt_for_platform(article, platform, article_url)
    return results

