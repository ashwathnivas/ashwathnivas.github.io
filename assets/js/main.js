// Floating Navigation Manager
class FloatingNavManager {
    constructor() {
      this.nav = document.getElementById("floating-nav")
      this.navToggle = document.getElementById("nav-toggle")
      this.navLinks = document.querySelectorAll(".nav-link")
      this.sections = document.querySelectorAll("section[id]")
  
      this.init()
    }
  
    init() {
      this.setupToggle()
      this.setupNavigation()
      this.setupScrollSpy()
      this.handleResize()
    }
  
    setupToggle() {
      this.navToggle.addEventListener("click", () => {
        this.nav.classList.toggle("active")
      })
  
      // Close nav when clicking outside on mobile
      document.addEventListener("click", (e) => {
        if (window.innerWidth <= 1024 && !this.nav.contains(e.target) && this.nav.classList.contains("active")) {
          this.nav.classList.remove("active")
        }
      })
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
      this.navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${activeId}`) {
          link.classList.add("active")
        }
      })
    }
  
    handleResize() {
      window.addEventListener("resize", () => {
        if (window.innerWidth > 1024) {
          this.nav.classList.remove("active")
        }
      })
    }
  }
  
  // Theme Manager
  class ThemeManager {
    constructor() {
      this.theme = localStorage.getItem("theme") || "light"
      this.themeToggle = document.getElementById("theme-toggle")
      this.sunIcon = this.themeToggle.querySelector(".sun-icon")
      this.moonIcon = this.themeToggle.querySelector(".moon-icon")
  
      this.init()
    }
  
    init() {
      this.setTheme(this.theme)
      this.themeToggle.addEventListener("click", () => this.toggleTheme())
    }
  
    setTheme(theme) {
      this.theme = theme
      document.documentElement.setAttribute("data-theme", theme)
      localStorage.setItem("theme", theme)
  
      // Update icons
      if (theme === "dark") {
        this.sunIcon.style.opacity = "0"
        this.moonIcon.style.opacity = "1"
      } else {
        this.sunIcon.style.opacity = "1"
        this.moonIcon.style.opacity = "0"
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
  
      // Filter by search
      if (this.currentSearch) {
        filteredPosts = filteredPosts.filter((post) => {
          const title = post.querySelector(".blog-title").textContent.toLowerCase()
          const excerpt = post.querySelector(".blog-excerpt").textContent.toLowerCase()
          const category = post.querySelector(".blog-category").textContent.toLowerCase()
  
          return (
            title.includes(this.currentSearch) ||
            excerpt.includes(this.currentSearch) ||
            category.includes(this.currentSearch)
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
  
  // Initialize all functionality
  document.addEventListener("DOMContentLoaded", () => {
    new FloatingNavManager()
    new ThemeManager()
    new BlogManager()
    new ScrollReveal()
    new SecurityDashboard()
    // new TypingEffect() // Uncomment if you want typing effect
  
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
  
  // Export for potential use in other scripts
  window.CyberSecurityPortfolio = {
    FloatingNavManager,
    ThemeManager,
    BlogManager,
    ScrollReveal,
    SecurityDashboard,
    debounce,
  }
  