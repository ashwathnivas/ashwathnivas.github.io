---
layout: default
title: Home
---

# Welcome 🚀
Here you’ll find my **projects**, **blogs**, and more.

## Latest Posts
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a> 
      <small>({{ post.date | date: "%b %d, %Y" }})</small>
    </li>
  {% endfor %}
</ul>
