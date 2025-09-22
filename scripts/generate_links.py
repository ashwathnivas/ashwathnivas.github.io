#!/usr/bin/env python3
import re, html
from pathlib import Path

POSTS_DIR = Path("_posts")
OUT_FILE = Path("site-links.html")
CSS_PATH = "assets/css/style.css"
MAX_WORDS = 30

HEADER = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="{CSS_PATH}">
<title>All Posts</title>
</head>
<body>
<h2>All Posts</h2>
<div class="card-grid">
"""
FOOTER = "</div></body></html>"

def clean_text(s):
    s = re.sub(r'<[^>]+>', '', s)
    s = html.unescape(s)
    return ' '.join(s.split())

def truncate(s, n):
    words = s.split()
    return ' '.join(words[:n]) + ("..." if len(words) > n else "")

cards = []
for p in sorted(POSTS_DIR.glob("*.html"), reverse=True):
    txt = p.read_text(encoding="utf-8", errors="ignore")

    title = re.search(r"<title>(.*?)</title>", txt, re.I|re.S)
    date = re.search(r"<small>(.*?)</small>", txt, re.I|re.S)
    summary = re.search(r"<p>(.*?)</p>", txt, re.I|re.S)

    title = title.group(1).strip() if title else p.name
    date = date.group(1).strip() if date else ""
    summary = truncate(clean_text(summary.group(1))) if summary else ""

    cards.append(f"""
    <div class="card">
      <h3><a href="_posts/{p.name}">{html.escape(title)}</a></h3>
      {'<p class="date">'+html.escape(date)+'</p>' if date else ''}
      {'<p class="summary">'+html.escape(summary)+'</p>' if summary else ''}
    </div>
    """)

OUT_FILE.write_text(HEADER + "\n".join(cards) + FOOTER, encoding="utf-8")
print(f"✅ site-links.html updated with {len(cards)} posts")
