#!/usr/bin/env python3
"""Generate feed.xml (RSS 2.0) from data/news.json."""

import json
import sys
from datetime import datetime
from pathlib import Path

SITE_URL = "https://entreprenais.com"
FEED_TITLE = "EntreprenAIs / 樽石デジタル技術研究所合同会社"
FEED_DESC = "EntreprenAIs — エッジで自律する AI エージェントの時代へ。グリーン電力で持続稼働するプラットフォームを TDRI が研究開発しています。"
FEED_URL = f"{SITE_URL}/feed.xml"

def to_rfc822(date_str: str) -> str:
    dt = datetime.strptime(date_str, "%Y-%m-%d")
    return dt.strftime("%a, %d %b %Y 00:00:00 +0900")

def escape_xml(text: str) -> str:
    return (text
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;"))

def main():
    news_path = Path(__file__).parent.parent / "data" / "news.json"
    news = json.loads(news_path.read_text(encoding="utf-8"))

    items = []
    for item in news:
        if item.get("external") and item.get("url", "").startswith("http"):
            link = item["url"]
        else:
            link = f"{SITE_URL}{item['url']}"
        guid = link

        items.append(f"""  <item>
    <title><![CDATA[{item['title']}]]></title>
    <link>{escape_xml(link)}</link>
    <description><![CDATA[{item.get('summary', '')}]]></description>
    <pubDate>{to_rfc822(item['date'])}</pubDate>
    <guid isPermaLink="true">{escape_xml(guid)}</guid>
  </item>""")

    last_build = to_rfc822(news[0]["date"]) if news else ""
    items_xml = "\n".join(items)

    feed = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>{escape_xml(FEED_TITLE)}</title>
    <link>{SITE_URL}/</link>
    <description>{escape_xml(FEED_DESC)}</description>
    <language>ja</language>
    <atom:link href="{FEED_URL}" rel="self" type="application/rss+xml"/>
    <lastBuildDate>{last_build}</lastBuildDate>
{items_xml}
  </channel>
</rss>
"""
    print(feed, end="")

if __name__ == "__main__":
    main()
