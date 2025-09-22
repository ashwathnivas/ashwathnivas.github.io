# scripts/generate_links.py
#!/usr/bin/env python3
import re
import html
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
FOOTER = """
</div>
</body>
</html>
"""

def extract_first(pattern, text):
    m = re.search(pattern, text, re.I | re.S)
    return m.group(1).strip() if m else ""

def clean_text(s):
    s = re.sub(r'<[^>]+>', '', s)  # strip tags
    s = html.unescape(s)
    s = ' '.join(s.split())
    return s

def truncate_words(s, n):
    words = s.split()
    if len(words) > n:
        return ' '.join(words[:n]) + '...'
    return s

posts = sorted(POSTS_DIR.glob("*.html"), reverse=True)

out_parts = [HEADER]

for p in posts:
    try:
        txt = p.read_text(encoding='utf-8')
    except Exception:
        txt = p.read_text(encoding='latin-1')

    title = extract_first(r'<title>(.*?)</title>', txt) or p.name
    date = extract_first(r'<small>(.*?)</small>', txt)
    summary_raw = extract_first(r'<p>(.*?)</p>', txt)
    summary = clean_text(summary_raw)
    summary = truncate_words(summary, MAX_WORDS)

    title_esc = html.escape(title)
    date_esc = html.escape(date) if date else ""
    summary_esc = html.escape(summary) if summary else ""

    card = f"""<div class="card">
  <h3><a href="_posts/{p.name}">{title_esc}</a></h3>
  {"<p class=\"date\">"+date_esc+"</p>" if date_esc else ""}
  {"<p class=\"summary\">"+summary_esc+"</p>" if summary_esc else ""}
</div>
"""
    out_parts.append(card)

out_parts.append(FOOTER)
OUT_FILE.write_text(''.join(out_parts), encoding='utf-8')
print(f"Wrote {OUT_FILE} ({len(posts)} posts).")
