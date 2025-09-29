// Bottom Navigation Manager
class BottomNavManager {
    constructor() {
      this.bottomNav = document.getElementById("bottom-nav")
      this.navItems = document.querySelectorAll(".bottom-nav .nav-item")
      this.sections = document.querySelectorAll("section[id]")
      this.mainContent = document.querySelector(".main-content")
  
      this.init()
    }
  
    init() {
      this.setupNavigation()
      this.setupScrollSpy()
    }
  
    setupNavigation() {
      this.navItems.forEach((item) => {
        if (!item.classList.contains("theme-toggle")) {
          item.addEventListener("click", (e) => {
            e.preventDefault()
            const targetId = item.getAttribute("href")
            const targetSection = document.querySelector(targetId)
  
            if (targetSection) {
              const offsetTop = targetSection.offsetTop - 2 * 16 // 2rem offset
              window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
              })
            }
          })
        }
      })
    }
  
    setupScrollSpy() {
      const observerOptions = {
        threshold: 0.3,
        rootMargin: "-20% 0px -70% 0px",
      }
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id")
            this.updateActiveNav(id)
          }
        })
      }, observerOptions)
  
      this.sections.forEach((section) => observer.observe(section))
    }
  
    updateActiveNav(activeId) {
      // Update bottom nav
      this.navItems.forEach((item) => {
        item.classList.remove("active")
        if (item.getAttribute("href") === `#${activeId}`) {
          item.classList.add("active")
        }
      })
    }
  }
  
  // Unified Dock Manager - Works on both desktop and mobile
  class UnifiedDockManager {
    constructor() {
      this.unifiedDock = document.getElementById("unified-dock")
      this.dockItems = document.querySelectorAll(".unified-dock .dock-item")
      this.sections = document.querySelectorAll("section[id]")
  
      this.init()
    }
  
    init() {
      this.setupNavigation()
      this.setupScrollSpy()
    }
  
    setupNavigation() {
      this.dockItems.forEach((item) => {
        if (!item.classList.contains("theme-toggle")) {
          item.addEventListener("click", (e) => {
            e.preventDefault()
            const targetId = item.getAttribute("href")
  
            // Handle external links (blog.html, projects.html)
            if (targetId && !targetId.startsWith("#")) {
              window.location.href = targetId
              return
            }
  
            const targetSection = document.querySelector(targetId)
            if (targetSection) {
              const offsetTop = targetSection.offsetTop - 2 * 16 // 2rem offset
              window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
              })
            }
          })
        }
      })
    }
  
    setupScrollSpy() {
      const observerOptions = {
        threshold: 0.3,
        rootMargin: "-20% 0px -70% 0px",
      }
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id")
            this.updateActiveNav(id)
          }
        })
      }, observerOptions)
  
      this.sections.forEach((section) => observer.observe(section))
    }
  
    updateActiveNav(activeId) {
      this.dockItems.forEach((item) => {
        item.classList.remove("active")
        if (item.getAttribute("href") === `#${activeId}`) {
          item.classList.add("active")
        }
      })
    }
  }
  
  // Mobile Bottom Navigation Manager
  class MobileBottomNavManager {
    constructor() {
      this.mobileBottomNav = document.getElementById("mobile-bottom-nav")
      this.mobileNavItems = document.querySelectorAll(".mobile-bottom-nav .mobile-nav-item")
      this.sections = document.querySelectorAll("section[id]")
  
      this.init()
    }
  
    init() {
      this.setupNavigation()
      this.setupScrollSpy()
    }
  
    setupNavigation() {
      this.mobileNavItems.forEach((item) => {
        if (!item.classList.contains("theme-toggle")) {
          item.addEventListener("click", (e) => {
            e.preventDefault()
            const targetId = item.getAttribute("href")
            const targetSection = document.querySelector(targetId)
  
            if (targetSection) {
              const offsetTop = targetSection.offsetTop - 2 * 16 // 2rem offset
              window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
              })
            }
          })
        }
      })
    }
  
    setupScrollSpy() {
      const observerOptions = {
        threshold: 0.3,
        rootMargin: "-20% 0px -70% 0px",
      }
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id")
            this.updateActiveNav(id)
          }
        })
      }, observerOptions)
  
      this.sections.forEach((section) => observer.observe(section))
    }
  
    updateActiveNav(activeId) {
      this.mobileNavItems.forEach((item) => {
        item.classList.remove("active")
        if (item.getAttribute("href") === `#${activeId}`) {
          item.classList.add("active")
        }
      })
    }
  }
  
  // Theme Manager
  class ThemeManager {
    constructor() {
      this.theme = localStorage.getItem("theme") || "dark" // Default to dark
      this.themeToggle = document.getElementById("theme-toggle")
      this.mobileThemeToggle = document.getElementById("mobile-theme-toggle")
  
      this.init()
    }
  
    init() {
      this.setTheme(this.theme)
      this.themeToggle?.addEventListener("click", () => this.toggleTheme())
      this.mobileThemeToggle?.addEventListener("click", () => this.toggleTheme())
    }
  
    setTheme(theme) {
      this.theme = theme
      document.documentElement.setAttribute("data-theme", theme)
      localStorage.setItem("theme", theme)
  
      // Update both desktop and mobile theme toggles
      this.updateThemeIcons(this.themeToggle, theme)
      this.updateThemeIcons(this.mobileThemeToggle, theme)
    }
  
    updateThemeIcons(toggle, theme) {
      if (!toggle) return
  
      const sunIcon = toggle.querySelector(".sun-icon")
      const moonIcon = toggle.querySelector(".moon-icon")
  
      if (sunIcon && moonIcon) {
        if (theme === "light") {
          sunIcon.style.opacity = "1"
          moonIcon.style.opacity = "0"
        } else {
          sunIcon.style.opacity = "0"
          moonIcon.style.opacity = "1"
        }
      }
    }
  
    toggleTheme() {
      const newTheme = this.theme === "light" ? "dark" : "light"
      this.setTheme(newTheme)
    }
  }
  
  // Blog Manager with Enhanced Search and Category Support
  class BlogManager {
    constructor() {
      this.blogGrid = document.getElementById("blog-grid") || document.getElementById("blog-posts-grid")
      this.categoryBtns = document.querySelectorAll(".category-btn, .filter-btn")
      this.searchInput = document.getElementById("search-input") || document.getElementById("blog-search")
      this.searchBtn = document.getElementById("search-btn")
      this.allPosts = []
      this.currentCategory = "all"
      this.currentSearch = ""
  
      this.init()
    }
  
    init() {
      if (this.blogGrid) {
        this.loadPosts()
        this.setupCategoryFilters()
        this.setupSearch()
      }
    }
  
    loadPosts() {
      this.allPosts = Array.from(document.querySelectorAll(".blog-card"))
      this.showPosts(this.allPosts)
    }
  
    setupCategoryFilters() {
      this.categoryBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          // Update active button
          this.categoryBtns.forEach((b) => b.classList.remove("active"))
          btn.classList.add("active")
  
          // Filter posts
          this.currentCategory = btn.dataset.category
          this.filterAndSearch()
        })
      })
    }
  
    setupSearch() {
      if (!this.searchInput) return
  
      const performSearch = () => {
        this.currentSearch = this.searchInput.value.toLowerCase().trim()
        this.filterAndSearch()
      }
  
      this.searchInput.addEventListener("input", debounce(performSearch, 200))
      if (this.searchBtn) {
        this.searchBtn.addEventListener("click", performSearch)
      }
      this.searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          performSearch()
        }
      })
    }
  
    filterAndSearch() {
      let filteredPosts = this.allPosts
  
      // Filter by category
      if (this.currentCategory !== "all") {
        filteredPosts = filteredPosts.filter((post) => post.dataset.category === this.currentCategory)
      }
  
      // Filter by search (including tags)
      if (this.currentSearch) {
        filteredPosts = filteredPosts.filter((post) => {
          const title = post.querySelector("h2, .blog-title")?.textContent.toLowerCase() || ""
          const excerpt = post.querySelector("p, .blog-excerpt")?.textContent.toLowerCase() || ""
          const category = post.querySelector(".blog-category")?.textContent.toLowerCase() || ""
          const tags = post.dataset.tags?.toLowerCase() || ""
  
          return (
            title.includes(this.currentSearch) ||
            excerpt.includes(this.currentSearch) ||
            category.includes(this.currentSearch) ||
            tags.includes(this.currentSearch)
          )
        })
      }
  
      this.showPosts(filteredPosts)
    }
  
    showPosts(posts) {
      // Hide all posts first
      this.allPosts.forEach((post) => {
        post.style.display = "none"
        post.classList.remove("reveal", "active")
      })
  
      // Show filtered posts with staggered animation
      posts.forEach((post, index) => {
        post.style.display = "block"
        setTimeout(() => {
          post.classList.add("reveal", "active")
        }, index * 100)
      })
  
      // Handle no results
      if (posts.length === 0) {
        this.showNoResults()
      } else {
        this.hideNoResults()
      }
    }
  
    showNoResults() {
      let noResults = document.querySelector(".no-results")
      if (!noResults) {
        noResults = document.createElement("div")
        noResults.className = "no-results"
        noResults.innerHTML = `
          <div style="text-align: center; padding: 4rem 2rem; color: var(--text-secondary);">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
            <h3 style="margin-bottom: 1rem; color: var(--text-primary);">No posts found</h3>
            <p>Try adjusting your search terms or category filter.</p>
          </div>
        `
        this.blogGrid.appendChild(noResults)
      }
      noResults.style.display = "block"
    }
  
    hideNoResults() {
      const noResults = document.querySelector(".no-results")
      if (noResults) {
        noResults.style.display = "none"
      }
    }
  }
  
  // Project Manager
  class ProjectManager {
    constructor() {
      this.projectsGrid = document.getElementById("projects-grid")
      this.categoryBtns = document.querySelectorAll(".project-category-btn, .filter-btn")
      this.allProjects = []
      this.currentCategory = "all"
  
      this.init()
    }
  
    init() {
      if (this.projectsGrid) {
        this.loadProjects()
        this.setupCategoryFilters()
      }
    }
  
    loadProjects() {
      this.allProjects = Array.from(document.querySelectorAll(".project-card"))
      this.showProjects(this.allProjects)
    }
  
    setupCategoryFilters() {
      this.categoryBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          // Update active button
          this.categoryBtns.forEach((b) => b.classList.remove("active"))
          btn.classList.add("active")
  
          // Filter projects
          this.currentCategory = btn.dataset.category
          this.filterProjects()
        })
      })
    }
  
    filterProjects() {
      let filteredProjects = this.allProjects
  
      // Filter by category
      if (this.currentCategory !== "all") {
        filteredProjects = filteredProjects.filter((project) => project.dataset.category === this.currentCategory)
      }
  
      this.showProjects(filteredProjects)
    }
  
    showProjects(projects) {
      // Hide all projects first
      this.allProjects.forEach((project) => {
        project.style.display = "none"
        project.classList.remove("reveal", "active")
      })
  
      // Show filtered projects with staggered animation
      projects.forEach((project, index) => {
        project.style.display = "block"
        setTimeout(() => {
          project.classList.add("reveal", "active")
        }, index * 100)
      })
    }
  }
  
  // Scroll Reveal Animation
  class ScrollReveal {
    constructor() {
      this.elements = document.querySelectorAll(`
        .hero-badge, .hero-title, .hero-description, .hero-stats, .hero-actions, .hero-social,
        .skill-item, .project-card, .tool-card, .about-text
      `)
      this.init()
    }
  
    init() {
      this.observeElements()
    }
  
    observeElements() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal", "active")
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        },
      )
  
      this.elements.forEach((el) => observer.observe(el))
    }
  }
  
  // Social Sharing Manager for blog posts
  class SocialSharingManager {
    constructor() {
      this.init()
    }
  
    init() {
      this.setupSharingButtons()
    }
  
    setupSharingButtons() {
      document.addEventListener("click", (e) => {
        if (e.target.closest(".share-btn")) {
          e.preventDefault()
          const shareBtn = e.target.closest(".share-btn")
          const platform = shareBtn.dataset.platform
          const url = shareBtn.dataset.url || window.location.href
          const title = shareBtn.dataset.title || document.title
  
          this.shareToSocial(platform, url, title)
        }
      })
    }
  
    shareToSocial(platform, url, title) {
      const encodedUrl = encodeURIComponent(url)
      const encodedTitle = encodeURIComponent(title)
      const encodedText = encodeURIComponent(`Check out this article: "${title}"`)
  
      let shareUrl = ""
  
      switch (platform) {
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
          break
        case "linkedin":
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
          break
        case "bluesky":
          shareUrl = `https://bsky.app/intent/compose?text=${encodedText}%20${encodedUrl}`
          break
        default:
          console.warn("Unknown social platform:", platform)
          return
      }
  
      // Open in new window
      window.open(shareUrl, "social-share", "width=600,height=400,scrollbars=yes,resizable=yes")
    }
  
    // Helper method to generate sharing buttons HTML
    static generateSharingButtons(postUrl, postTitle) {
      return `
        <div class="blog-social-share">
          <a href="#" class="share-btn twitter" data-platform="twitter" data-url="${postUrl}" data-title="${postTitle}" aria-label="Share on Twitter/X">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="#" class="share-btn linkedin" data-platform="linkedin" data-url="${postUrl}" data-title="${postTitle}" aria-label="Share on LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.564v11.452zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.065 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="#" class="share-btn bluesky" data-platform="bluesky" data-url="${postUrl}" data-title="${postTitle}" aria-label="Share on Bluesky">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-2.67-.296-5.568.628-6.383 3.364C.378 17.902 0 22.862 0 23.55c0 .688.139 1.86.902 2.203.659.299 1.664.621 4.3-1.239C16.046 4.747 13.087 8.686 12 10.8z"/>
            </svg>
          </a>
        </div>
      `
    }
  }
  
  // Rotating Text Manager with Fade Effect
  class RotatingTextManager {
    constructor() {
      this.rotatingText = document.getElementById("rotating-text")
      this.texts = [
        "one line of code at a time",
        "through advanced threat detection",
        "with machine learning algorithms",
        "by building robust defenses",
        "using cutting-edge research",
      ]
      this.currentIndex = 0
  
      this.init()
    }
  
    init() {
      if (this.rotatingText) {
        this.startRotation()
      }
    }
  
    startRotation() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.texts.length
        this.updateTextWithFade()
      }, 4000) // Change every 4 seconds for better readability
    }
  
    updateTextWithFade() {
      // Add fade-out class
      this.rotatingText.classList.add("fade-out")
  
      // Wait for fade-out transition to complete, then change text and fade in
      setTimeout(() => {
        this.rotatingText.textContent = this.texts[this.currentIndex]
        this.rotatingText.classList.remove("fade-out")
      }, 400) // Match the CSS transition duration
    }
  }
  
  // Reading Progress Manager with better blog post detection
  class ReadingProgressManager {
    constructor() {
      this.progressBar = document.getElementById("reading-progress")
      this.init()
    }
  
    init() {
      if (this.progressBar) {
        this.setupScrollListener()
        // Initialize progress on page load
        this.updateProgress()
      }
    }
  
    setupScrollListener() {
      window.addEventListener(
        "scroll",
        debounce(() => {
          this.updateProgress()
        }, 10),
      )
    }
  
    updateProgress() {
      const isBlogPost =
        window.location.pathname.includes("_posts/") ||
        document.querySelector(".blog-post-content") ||
        document.querySelector("article") ||
        document.querySelector(".blog-section") ||
        document.body.classList.contains("blog-post")
  
      if (!isBlogPost) {
        this.progressBar.style.display = "none"
        return
      }
  
      // Show progress bar for blog posts
      this.progressBar.style.display = "block"
  
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100)
  
      this.progressBar.style.width = `${scrollPercent}%`
  
      if (scrollPercent > 1) {
        this.progressBar.classList.add("visible")
      } else {
        this.progressBar.classList.remove("visible")
      }
    }
  }
  
  // Dynamic Blog Navigation Manager
  class DynamicBlogNavigationManager {
    constructor() {
      this.blogPosts = [
        {
          title: "Zero-Day Exploit Detection Techniques",
          url: "zero-day-detection.html",
          category: "cybersecurity",
          date: "2024-12-10",
        },
        {
          title: "Advanced Threat Detection with Machine Learning",
          url: "ml-threat-detection.html",
          category: "cybersecurity",
          date: "2024-12-15",
        },
        {
          title: "AI-Powered Network Security Monitoring",
          url: "ai-network-security.html",
          category: "cybersecurity",
          date: "2024-12-20",
        },
        {
          title: "Reverse Engineering Modern Ransomware",
          url: "../malware/ransomware-analysis.html",
          category: "malware",
          date: "2024-11-28",
        },
        {
          title: "Dynamic Malware Analysis in Sandboxed Environments",
          url: "../malware/dynamic-analysis.html",
          category: "malware",
          date: "2024-11-20",
        },
      ]
      this.init()
    }
  
    init() {
      if (window.location.pathname.includes("_posts/")) {
        this.setupDynamicNavigation()
      }
    }
  
    setupDynamicNavigation() {
      const currentUrl = window.location.pathname.split("/").pop()
      const currentPostIndex = this.blogPosts.findIndex((post) => post.url.includes(currentUrl))
  
      if (currentPostIndex === -1) return
  
      const prevPost = currentPostIndex > 0 ? this.blogPosts[currentPostIndex - 1] : null
      const nextPost = currentPostIndex < this.blogPosts.length - 1 ? this.blogPosts[currentPostIndex + 1] : null
  
      // Update previous post link
      const prevPostLink = document.getElementById("prev-post-link")
      if (prevPostLink && prevPost) {
        prevPostLink.href = prevPost.url
        prevPostLink.title = prevPost.title
        prevPostLink.style.display = "inline-flex"
      } else if (prevPostLink) {
        prevPostLink.style.display = "none"
      }
  
      // Update next post link
      const nextPostLink = document.getElementById("next-post-link")
      if (nextPostLink && nextPost) {
        nextPostLink.href = nextPost.url
        nextPostLink.title = nextPost.title
        nextPostLink.style.display = "inline-flex"
      } else if (nextPostLink) {
        nextPostLink.style.display = "none"
      }
    }
  }
  
  // Related Posts Manager
  class RelatedPostsManager {
    constructor() {
      this.init()
    }
  
    init() {
      // This would be called on individual blog post pages
      if (window.location.pathname.includes("_posts/")) {
        this.loadRelatedPosts()
      }
    }
  
    loadRelatedPosts() {
      // Mock data - in real implementation, this would fetch from your posts
      const currentCategory = this.getCurrentCategory()
      const relatedPosts = this.getRelatedPosts(currentCategory)
  
      if (relatedPosts.length > 0) {
        this.renderRelatedPosts(relatedPosts)
      }
    }
  
    getCurrentCategory() {
      // Extract category from URL path
      const pathParts = window.location.pathname.split("/")
      return pathParts[pathParts.length - 2] || "cybersecurity"
    }
  
    getRelatedPosts(currentCategory) {
      const allPosts = [
        {
          title: "Advanced Threat Detection with Machine Learning",
          excerpt: "Exploring how ML algorithms can identify zero-day threats...",
          category: "cybersecurity",
          url: "_posts/cybersecurity/ml-threat-detection.html",
        },
        {
          title: "Building Scalable Security Infrastructure",
          excerpt: "Best practices for designing security systems...",
          category: "engineering",
          url: "_posts/engineering/scalable-security.html",
        },
        {
          title: "Reverse Engineering Modern Ransomware",
          excerpt: "A deep dive into the latest ransomware techniques...",
          category: "malware",
          url: "_posts/malware/ransomware-analysis.html",
        },
        {
          title: "Zero-Day Vulnerability Research",
          excerpt: "Methods and tools for discovering security flaws...",
          category: "cybersecurity",
          url: "_posts/cybersecurity/zero-day-research.html",
        },
        {
          title: "API Security Best Practices",
          excerpt: "Securing modern web APIs against common attacks...",
          category: "engineering",
          url: "_posts/engineering/api-security.html",
        },
      ]
  
      // Get 2 from same category, 1 from different
      const sameCategory = allPosts.filter((post) => post.category === currentCategory).slice(0, 2)
      const differentCategory = allPosts.filter((post) => post.category !== currentCategory).slice(0, 1)
  
      return [...sameCategory, ...differentCategory].slice(0, 3)
    }
  
    renderRelatedPosts(posts) {
      const relatedSection = document.createElement("div")
      relatedSection.className = "related-posts"
      relatedSection.innerHTML = `
        <h3>Related Posts</h3>
        <div class="related-posts-grid">
          ${posts
            .map(
              (post) => `
            <div class="related-post-card">
              <span class="blog-category ${post.category}">${post.category}</span>
              <h4>${post.title}</h4>
              <p>${post.excerpt}</p>
              <a href="${post.url}" class="blog-link">Read more</a>
            </div>
          `,
            )
            .join("")}
        </div>
      `
  
      // Insert before any existing footer or at the end of main content
      const mainContent = document.querySelector("main") || document.body
      mainContent.appendChild(relatedSection)
    }
  }
  
  // Code Highlight Manager
  class CodeHighlightManager {
    constructor() {
      this.init()
    }
  
    init() {
      // Initialize Prism.js copy to clipboard plugin
      const Prism = window.Prism // Declare Prism variable
      if (typeof Prism !== "undefined") {
        Prism.plugins.toolbar.registerButton("copy-to-clipboard", {
          text: "Copy",
          onClick: function (env) {
            this.copyToClipboard(env.code)
          },
        })
      }
  
      // Add custom copy functionality for code blocks
      this.setupCopyButtons()
    }
  
    setupCopyButtons() {
      document.addEventListener("click", (e) => {
        if (e.target.classList.contains("copy-to-clipboard-button")) {
          const codeBlock = e.target.closest("pre").querySelector("code")
          const code = codeBlock.textContent
          this.copyToClipboard(code)
  
          // Visual feedback
          const originalText = e.target.textContent
          e.target.textContent = "Copied!"
          setTimeout(() => {
            e.target.textContent = originalText
          }, 2000)
        }
      })
    }
  
    copyToClipboard(text) {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            console.log("[v0] Code copied to clipboard")
          })
          .catch((err) => {
            console.error("[v0] Failed to copy code:", err)
            this.fallbackCopyTextToClipboard(text)
          })
      } else {
        this.fallbackCopyTextToClipboard(text)
      }
    }
  
    fallbackCopyTextToClipboard(text) {
      const textArea = document.createElement("textarea")
      textArea.value = text
      textArea.style.top = "0"
      textArea.style.left = "0"
      textArea.style.position = "fixed"
  
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
  
      try {
        document.execCommand("copy")
        console.log("[v0] Code copied to clipboard (fallback)")
      } catch (err) {
        console.error("[v0] Fallback copy failed:", err)
      }
  
      document.body.removeChild(textArea)
    }
  }
  
  // Utility Functions
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    new UnifiedDockManager() // Using unified dock instead of separate managers
    new ThemeManager()
    new RotatingTextManager() // Enhanced with fade effect
    new BlogManager()
    new ProjectManager()
    new ScrollReveal()
    new SocialSharingManager()
    new ReadingProgressManager()
    new RelatedPostsManager()
    new CodeHighlightManager()
    new DynamicBlogNavigationManager()
  
    console.log("[v0] Cyber Security Portfolio with unified dock navigation initialized successfully")
  })
  
  // Handle window events
  window.addEventListener(
    "resize",
    debounce(() => {
      // Trigger any resize-dependent functionality
      console.log("[v0] Window resized")
    }, 250),
  )
  
  window.CyberSecurityPortfolio = {
    UnifiedDockManager, // New unified dock manager
    ThemeManager,
    RotatingTextManager,
    BlogManager,
    ProjectManager,
    ScrollReveal,
    SocialSharingManager,
    ReadingProgressManager,
    RelatedPostsManager,
    CodeHighlightManager,
    DynamicBlogNavigationManager,
    debounce,
  }
  