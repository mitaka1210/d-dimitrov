#!/usr/bin/env python3
"""
Публикатор в социални мрежи.
"""

import os
import asyncio
import logging

logger = logging.getLogger(__name__)


def _publish_facebook(text: str, image_url: str | None) -> dict:
    import requests
    page_id = os.environ["FACEBOOK_PAGE_ID"]
    token = os.environ["FACEBOOK_PAGE_TOKEN"]
    payload = {"message": text[:63000], "access_token": token}
    if image_url:
        # Пост с изображение
        r = requests.post(
            f"https://graph.facebook.com/v19.0/{page_id}/photos",
            data={"url": image_url, "caption": text[:63000], "access_token": token},
            timeout=15
        )
    else:
        r = requests.post(
            f"https://graph.facebook.com/v19.0/{page_id}/feed",
            data=payload, timeout=15
        )
    r.raise_for_status()
    return {"ok": True, "id": r.json().get("id")}


def _publish_instagram(text: str, image_url: str | None) -> dict:
    import requests
    ig_id = os.environ["INSTAGRAM_ACCOUNT_ID"]
    token = os.environ["INSTAGRAM_ACCESS_TOKEN"]
    default_img = os.environ.get("INSTAGRAM_DEFAULT_IMAGE_URL", "")
    final_image = image_url or default_img
    if not final_image:
        return {"ok": False, "error": "Няма изображение за Instagram"}

    r1 = requests.post(
        f"https://graph.facebook.com/v19.0/{ig_id}/media",
        data={"image_url": final_image, "caption": text[:2200], "access_token": token},
        timeout=15
    )
    r1.raise_for_status()
    creation_id = r1.json()["id"]

    r2 = requests.post(
        f"https://graph.facebook.com/v19.0/{ig_id}/media_publish",
        data={"creation_id": creation_id, "access_token": token},
        timeout=15
    )
    r2.raise_for_status()
    return {"ok": True, "id": r2.json().get("id")}


def _publish_twitter(text: str, image_url: str | None) -> dict:
    import tweepy
    client = tweepy.Client(
        consumer_key=os.environ["TWITTER_API_KEY"],
        consumer_secret=os.environ["TWITTER_API_SECRET"],
        access_token=os.environ["TWITTER_ACCESS_TOKEN"],
        access_token_secret=os.environ["TWITTER_ACCESS_SECRET"],
    )
    tweet = text[:277] + "…" if len(text) > 280 else text
    r = client.create_tweet(text=tweet)
    return {"ok": True, "id": r.data["id"]}


def _publish_linkedin(text: str, image_url: str | None) -> dict:
    import requests
    token = os.environ["LINKEDIN_ACCESS_TOKEN"]
    person_urn = os.environ["LINKEDIN_PERSON_URN"]
    payload = {
        "author": person_urn,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {"text": text[:3000]},
                "shareMediaCategory": "NONE"
            }
        },
        "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"}
    }
    r = requests.post(
        "https://api.linkedin.com/v2/ugcPosts",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "X-Restli-Protocol-Version": "2.0.0"
        },
        json=payload, timeout=15
    )
    r.raise_for_status()
    return {"ok": True, "id": r.headers.get("x-restli-id")}


PUBLISHERS = {
    "facebook":  ("Facebook",   "📘", _publish_facebook),
    "instagram": ("Instagram",  "📸", _publish_instagram),
    "twitter":   ("Twitter/X",  "🐦", _publish_twitter),
    "linkedin":  ("LinkedIn",   "💼", _publish_linkedin),
}


async def publish_to_platforms(platforms: list[str], text: str, image_url: str | None) -> dict:
    """Публикува в дадените платформи. Връща речник с резултати."""
    results = {}
    loop = asyncio.get_event_loop()
    for key in platforms:
        name, emoji, fn = PUBLISHERS[key]
        try:
            result = await loop.run_in_executor(None, fn, text, image_url)
            results[key] = {"ok": result["ok"], "name": name, "emoji": emoji,
                            "error": result.get("error")}
        except Exception as e:
            results[key] = {"ok": False, "name": name, "emoji": emoji, "error": str(e)}
        logger.info(f"{emoji} {name}: {'✅' if results[key]['ok'] else '❌'}")
    return results
