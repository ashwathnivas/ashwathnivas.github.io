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
<h1>Blog Posts</h1>
"""
FOOTER = "</body></html>"

def clean_text(s):
    s = re.sub(r'<[^>]+>', '', s)
    s = html.unescape(s)
    return ' '.join(s.split())

def truncate(s, n):
    words = s.split()
    return ' '.join(words[:n]) + ("..." if len(words) > n else "")

def generate_cards(posts):
    cards = []
    for p in sorted(posts, reverse=True):
        txt = p.read_text(encoding="utf-8", errors="ignore")
        title = re.search(r"<title>(.*?)</title>", txt, re.I|re.S)
        date = re.search(r"<small>(.*?)</small>", txt, re.I|re.S)
        summary = re.search(r"<p>(.*?)</p>", txt, re.I|re.S)

        title = title.group(1).strip() if title else p.name
        date = date.group(1).strip() if date else ""
        summary = truncate(clean_text(summary.group(1)), MAX_WORDS) if summary else ""

        cards.append(f"""
        <div class="card">
          <h3><a href="{p.relative_to(Path.cwd())}">{html.escape(title)}</a></h3>
          {'<p class="date">'+html.escape(date)+'</p>' if date else ''}
          {'<p class="summary">'+html.escape(summary)+'</p>' if summary else ''}
        </div>
        """)
    return "\n".join(cards)

# Group posts by first-level folder
sections = {}

for p in POSTS_DIR.rglob("*.html"):
    relative = p.relative_to(POSTS_DIR)
    parts = relative.parts
    if len(parts) == 1:
        section = "General"
    else:
        section = parts[0]
    sections.setdefault(section, []).append(p)

# Build HTML
html_parts = [HEADER]

for section, posts in sorted(sections.items()):
    html_parts.append(f"<h2>{section}</h2><div class='card-grid'>")
    html_parts.append(generate_cards(posts))
    html_parts.append("</div>")

OUT_FILE.write_text("\n".join(html_parts), encoding="utf-8")
print(f"✅ site-links.html updated with {sum(len(p) for p in sections.values())} posts in {len(sections)} sections")
