// Floating Navigation Manager
class FloatingNavManager {
    constructor() {
      this.nav = document.getElementById("floating-nav")
      this.navToggle = document.getElementById("nav-toggle")
      this.panelToggle = document.getElementById("nav-panel-toggle")
      this.mobileBottomNav = document.getElementById("mobile-bottom-nav")
      this.mainContent = document.querySelector(".main-content")
      this.navLinks = document.querySelectorAll(".nav-link")
      this.mobileNavItems = document.querySelectorAll(".mobile-nav-item")
      this.sections = document.querySelectorAll("section[id]")
      this.isNavVisible = true
  
      this.init()
    }
  
    init() {
      this.setupToggle()
      this.setupPanelToggle()
      this.setupNavigation()
      this.setupMobileNavigation()
      this.setupScrollSpy()
      this.handleResize()
    }
  
    setupToggle() {
      if (this.navToggle) {
        this.navToggle.addEventListener("click", () => {
          this.nav.classList.toggle("active")
        })
      }
  
      // Close nav when clicking outside on mobile
      document.addEventListener("click", (e) => {
        if (
          window.innerWidth <= 1024 &&
          !this.nav.contains(e.target) &&
          !this.navToggle?.contains(e.target) &&
          this.nav.classList.contains("active")
        ) {
          this.nav.classList.remove("active")
        }
      })
    }
  
    setupPanelToggle() {
      if (this.panelToggle) {
        this.panelToggle.addEventListener("click", () => {
          this.toggleNavPanel()
        })
      }
    }
  
    setupMobileNavigation() {
      this.mobileNavItems.forEach((item) => {
        if (!item.classList.contains("theme-toggle-mobile")) {
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
  
    toggleNavPanel() {
      this.isNavVisible = !this.isNavVisible
  
      if (this.isNavVisible) {
        this.nav.classList.remove("nav-hidden")
        this.mainContent.classList.remove("nav-hidden")
        this.panelToggle.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12h18m-9-9l9 9-9 9"/>
          </svg>
        `
      } else {
        this.nav.classList.add("nav-hidden")
        this.mainContent.classList.add("nav-hidden")
        this.panelToggle.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12H3m18-9l-9 9 9 9"/>
          </svg>
        `
      }
    }
  
    setupNavigation() {
      this.navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault()
          const targetId = link.getAttribute("href")
          const targetSection = document.querySelector(targetId)
  
          if (targetSection) {
            const offsetTop = targetSection.offsetTop - 2 * 16 // 2rem offset
            window.scrollTo({
              top: offsetTop,
              behavior: "smooth",
            })
  
            // Close mobile nav
            if (window.innerWidth <= 1024) {
              this.nav.classList.remove("active")
            }
          }
        })
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
      // Update desktop nav
      this.navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${activeId}`) {
          link.classList.add("active")
        }
      })
  
      // Update mobile nav
      this.mobileNavItems.forEach((item) => {
        item.classList.remove("active")
        if (item.getAttribute("href") === `#${activeId}`) {
          item.classList.add("active")
        }
      })
    }
  
    handleResize() {
      window.addEventListener("resize", () => {
        if (window.innerWidth > 1024) {
          this.nav.classList.remove("active")
          // Reset panel visibility on desktop
          if (!this.isNavVisible) {
            this.nav.classList.add("nav-hidden")
            this.mainContent.classList.add("nav-hidden")
          }
        } else {
          // On mobile, always show nav when resizing
          this.nav.classList.remove("nav-hidden")
          this.mainContent.classList.remove("nav-hidden")
        }
      })
    }
  }
  
  // Theme Manager
  class ThemeManager {
    constructor() {
      this.theme = localStorage.getItem("theme") || "dark" // Default to dark
      this.themeToggle = document.getElementById("theme-toggle")
      this.themeToggleMobile = document.getElementById("theme-toggle-mobile")
      this.sunIcon = this.themeToggle?.querySelector(".sun-icon")
      this.moonIcon = this.themeToggle?.querySelector(".moon-icon")
  
      this.init()
    }
  
    init() {
      this.setTheme(this.theme)
      this.themeToggle?.addEventListener("click", () => this.toggleTheme())
      this.themeToggleMobile?.addEventListener("click", () => this.toggleTheme())
    }
  
    setTheme(theme) {
      this.theme = theme
      document.documentElement.setAttribute("data-theme", theme)
      localStorage.setItem("theme", theme)
  
      // Update desktop icons
      if (this.sunIcon && this.moonIcon) {
        if (theme === "light") {
          this.sunIcon.style.opacity = "1"
          this.moonIcon.style.opacity = "0"
        } else {
          this.sunIcon.style.opacity = "0"
          this.moonIcon.style.opacity = "1"
        }
      }
    }
  
    toggleTheme() {
      const newTheme = this.theme === "light" ? "dark" : "light"
      this.setTheme(newTheme)
    }
  }
  
  // Blog Manager with Category Support
  class BlogManager {
    constructor() {
      this.blogGrid = document.getElementById("blog-grid")
      this.categoryBtns = document.querySelectorAll(".category-btn")
      this.searchInput = document.getElementById("search-input")
      this.searchBtn = document.getElementById("search-btn")
      this.allPosts = []
      this.currentCategory = "all"
      this.currentSearch = ""
  
      this.init()
    }
  
    init() {
      this.loadPosts()
      this.setupCategoryFilters()
      this.setupSearch()
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
      const performSearch = () => {
        this.currentSearch = this.searchInput.value.toLowerCase().trim()
        this.filterAndSearch()
      }
  
      this.searchInput.addEventListener("input", debounce(performSearch, 300))
      this.searchBtn.addEventListener("click", performSearch)
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
          const title = post.querySelector(".blog-title").textContent.toLowerCase()
          const excerpt = post.querySelector(".blog-excerpt").textContent.toLowerCase()
          const category = post.querySelector(".blog-category").textContent.toLowerCase()
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
  
  // Scroll Reveal Animation
  class ScrollReveal {
    constructor() {
      this.elements = document.querySelectorAll(`
        .hero-badge, .hero-title, .hero-description, .hero-stats, .hero-actions,
        .security-dashboard, .skill-item, .project-card, .tool-card, .about-text
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
  
  // Security Dashboard Animation
  class SecurityDashboard {
    constructor() {
      this.dashboard = document.querySelector(".security-dashboard")
      this.metrics = document.querySelectorAll(".metric-value")
      this.init()
    }
  
    init() {
      if (this.dashboard) {
        this.animateMetrics()
      }
    }
  
    animateMetrics() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.startCountAnimation()
            observer.unobserve(entry.target)
          }
        })
      })
  
      observer.observe(this.dashboard)
    }
  
    startCountAnimation() {
      this.metrics.forEach((metric) => {
        const finalValue = metric.textContent
        const isNumber = /^\d+/.test(finalValue)
  
        if (isNumber) {
          const number = Number.parseInt(finalValue.replace(/,/g, ""))
          this.animateNumber(metric, 0, number, 2000)
        }
      })
    }
  
    animateNumber(element, start, end, duration) {
      const startTime = performance.now()
      const originalText = element.textContent
  
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
  
        const current = Math.floor(start + (end - start) * this.easeOutQuart(progress))
  
        if (originalText.includes(",")) {
          element.textContent = current.toLocaleString()
        } else {
          element.textContent = current.toString()
        }
  
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          element.textContent = originalText // Restore original formatting
        }
      }
  
      requestAnimationFrame(animate)
    }
  
    easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4)
    }
  }
  
  // Typing Effect for Hero Title
  class TypingEffect {
    constructor() {
      this.titleElement = document.querySelector(".hero-title")
      this.init()
    }
  
    init() {
      if (this.titleElement) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.startTyping()
              observer.unobserve(entry.target)
            }
          })
        })
  
        observer.observe(this.titleElement)
      }
    }
  
    startTyping() {
      const originalText = this.titleElement.innerHTML
      const highlightMatch = originalText.match(/<span class="highlight">(.*?)<\/span>/)
  
      if (highlightMatch) {
        const beforeHighlight = originalText.substring(0, originalText.indexOf("<span"))
        const highlightText = highlightMatch[1]
        const afterHighlight = originalText.substring(originalText.indexOf("</span>") + 7)
  
        this.titleElement.innerHTML = ""
  
        this.typeText(beforeHighlight, () => {
          this.titleElement.innerHTML += '<span class="highlight">'
          this.typeText(highlightText, () => {
            this.titleElement.innerHTML += "</span>" + afterHighlight
          })
        })
      }
    }
  
    typeText(text, callback) {
      let i = 0
      const timer = setInterval(() => {
        this.titleElement.innerHTML += text.charAt(i)
        i++
        if (i >= text.length) {
          clearInterval(timer)
          if (callback) callback()
        }
      }, 50)
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
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v11.452zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
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
  
  // Reading Progress Manager
  class ReadingProgressManager {
    constructor() {
      this.progressBar = document.getElementById("reading-progress")
      this.init()
    }
  
    init() {
      if (this.progressBar) {
        this.setupScrollListener()
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
      // Only show on blog posts (check if we're on a blog post page)
      const isBlogPost = window.location.pathname.includes("_posts/")
  
      if (!isBlogPost) {
        this.progressBar.classList.remove("visible")
        return
      }
  
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
  
      this.progressBar.style.width = `${Math.min(scrollPercent, 100)}%`
  
      if (scrollPercent > 5) {
        this.progressBar.classList.add("visible")
      } else {
        this.progressBar.classList.remove("visible")
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
      // Mock related posts - replace with actual data
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
    new FloatingNavManager()
    new ThemeManager()
    new BlogManager()
    new ScrollReveal()
    new SecurityDashboard()
    new SocialSharingManager()
    new ReadingProgressManager() // Added reading progress
    new RelatedPostsManager() // Added related posts
  
    console.log("[v0] Cyber Security Portfolio initialized successfully")
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
    FloatingNavManager,
    ThemeManager,
    BlogManager,
    ScrollReveal,
    SecurityDashboard,
    SocialSharingManager,
    ReadingProgressManager,
    RelatedPostsManager,
    debounce,
  }
  