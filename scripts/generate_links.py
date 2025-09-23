import os
from pathlib import Path
import html

# Paths
POSTS_DIR = Path("_posts")
OUTPUT_FILE = Path("site-links.html")
CSS_PATH = "assets/css/style.css"

def truncate(text, n=150):
    """Truncate text to n characters."""
    return text if len(text) <= n else text[:n] + "..."

def extract_post_data(file_path: Path):
    """Extract title, date, summary from an HTML post."""
    content = file_path.read_text(encoding="utf-8")
    
    # Extract <title>
    title_start = content.find("<title>")
    title_end = content.find("</title>")
    title = content[title_start + 7:title_end].strip() if title_start != -1 and title_end != -1 else file_path.stem

    # Extract first <small> as date
    date_start = content.find("<small>")
    date_end = content.find("</small>")
    date = content[date_start + 7:date_end].strip() if date_start != -1 and date_end != -1 else ""

    # Extract first <p> as summary
    summary_start = content.find("<p>")
    summary_end = content.find("</p>")
    summary = content[summary_start + 3:summary_end].strip() if summary_start != -1 and summary_end != -1 else ""

    summary = truncate(summary, 150)
    return {"title": title, "date": date, "summary": summary, "rel_path": str(file_path)}

def get_all_posts(posts_dir: Path):
    """Recursively collect all HTML posts."""
    posts = []
    for file_path in sorted(posts_dir.rglob("*.html"), reverse=True):
        posts.append(extract_post_data(file_path))
    return posts

def generate_site_links_html(posts):
    html_parts = [
        "<!DOCTYPE html>",
        "<html>",
        "<head>",
        f"<link rel='stylesheet' href='{CSS_PATH}'>",
        "<title>All Posts</title>",
        "</head>",
        "<body>",
        "<h1>All Posts</h1>",
        "<div class='card-grid'>"
    ]

    for p in posts:
        html_parts.append(f"""
        <div class='card'>
          <h3><a href='{p['rel_path']}'>{html.escape(p['title'])}</a></h3>
          <p class='date'>{html.escape(p['date'])}</p>
          <p class='summary'>{html.escape(p['summary'])}</p>
        </div>
        """)

    html_parts.append("</div></body></html>")
    return "\n".join(html_parts)

def main():
    posts = get_all_posts(POSTS_DIR)
    OUTPUT_FILE.write_text(generate_site_links_html(posts), encoding="utf-8")
    print(f"{len(posts)} posts written to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
