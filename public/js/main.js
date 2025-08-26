// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Preloader with enhanced animation
  window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    preloader.style.opacity = "0";
    preloader.style.transform = "scale(1.5)";
    setTimeout(function () {
      preloader.style.display = "none";
    }, 500);
  });

  // Initialize AOS with enhanced settings
  AOS.init({
    duration: 1000,
    easing: "ease-in-out-cubic",
    once: false,
    mirror: true,
    offset: 50,
  });

  // Enhanced Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", function () {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
      if (currentScroll > lastScroll) {
        navbar.style.transform = "translateY(-100%)";
      } else {
        navbar.style.transform = "translateY(0)";
      }
    } else {
      navbar.classList.remove("scrolled");
      navbar.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
  });

  // Enhanced Back to top button
  const backToTop = document.querySelector(".back-to-top");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTop.classList.add("active");
      backToTop.style.transform = "translateY(0)";
    } else {
      backToTop.classList.remove("active");
      backToTop.style.transform = "translateY(100px)";
    }
  });

  // Enhanced Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Add ripple effect to clicked link
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        this.appendChild(ripple);

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

        setTimeout(() => ripple.remove(), 600);

        // Close mobile menu if open
        const navbarToggler = document.querySelector(".navbar-toggler");
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click();
        }
      }
    });
  });

  // Enhanced Typing effect
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");

  const textArray = [
    "Flutter Developer",
    "Competitive Programmer",
    "Problem Solver",
    "UI/UX Enthusiast",
  ];

  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if (!cursorSpan.classList.contains("typing")) {
        cursorSpan.classList.add("typing");
      }
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if (!cursorSpan.classList.contains("typing")) {
        cursorSpan.classList.add("typing");
      }
      typedTextSpan.textContent = textArray[textArrayIndex].substring(
        0,
        charIndex - 1
      );
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) {
        textArrayIndex = 0;
      }
      setTimeout(type, typingDelay + 1100);
    }
  }

  if (textArray.length) {
    setTimeout(type, newTextDelay + 250);
  }

  // Enhanced Dark mode toggle with smooth transitions
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Add transition class to body
  body.classList.add("theme-transition");

  // Set dark mode as default
  body.classList.add("dark-mode");
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  localStorage.setItem("theme", "dark-mode");

  // Check for saved user preference (only if user has explicitly changed it before)
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "light-mode") {
    body.classList.remove("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }

  themeToggle.addEventListener("click", function () {
    const icon = this.querySelector("i");

    // Add transition class to all elements
    document.querySelectorAll("*").forEach((element) => {
      element.classList.add("theme-transition");
    });

    icon.style.transform = "rotate(360deg)";

    if (body.classList.contains("dark-mode")) {
      body.classList.remove("dark-mode");
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem("theme", "light-mode");
    } else {
      body.classList.add("dark-mode");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem("theme", "dark-mode");
    }

    // Remove transition class after animation
    setTimeout(() => {
      document.querySelectorAll("*").forEach((element) => {
        element.classList.remove("theme-transition");
      });
      icon.style.transform = "rotate(0deg)";
    }, 500);
  });

  // Enhanced skill bar animations
  function initSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress");
    skillBars.forEach((bar, index) => {
      const width = bar.style.width;
      bar.style.width = "0";
      setTimeout(() => {
        bar.style.width = width;
      }, 500 + index * 100);
    });
  }

  // Enhanced intersection observer for skill bars
  const aboutSection = document.getElementById("about");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          initSkillBars();
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "0px",
    }
  );

  if (aboutSection) {
    observer.observe(aboutSection);
  }

  // Enhanced Contact Form with email functionality
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const formInputs = contactForm.querySelectorAll(".form-control");

    formInputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.parentElement.classList.add("focused");
      });

      input.addEventListener("blur", function () {
        if (!this.value) {
          this.parentElement.classList.remove("focused");
        }
      });
    });

    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      };

      // Simple validation
      if (
        !formData.name ||
        !formData.email ||
        !formData.subject ||
        !formData.message
      ) {
        showNotification("Please fill in all fields", "error");
        return;
      }

      if (!isValidEmail(formData.email)) {
        showNotification("Please enter a valid email address", "error");
        return;
      }

      try {
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        // Send email using EmailJS
        await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
          to_email: "mdkhaledaminshawon@gmail.com",
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        });

        // Show success message
        showNotification(
          "Thank you for your message! I will get back to you soon.",
          "success"
        );
        contactForm.reset();
        formInputs.forEach((input) => {
          input.parentElement.classList.remove("focused");
        });
      } catch (error) {
        console.error("Error sending email:", error);
        showNotification(
          "Sorry, there was an error sending your message. Please try again later.",
          "error"
        );
      } finally {
        // Reset button state
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
      }
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Enhanced Project card hover effect
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;

      const mouseX = e.clientX - cardCenterX;
      const mouseY = e.clientY - cardCenterY;

      const rotateX = (mouseY / (cardRect.height / 2)) * -5;
      const rotateY = (mouseX / (cardRect.width / 2)) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;

      // Add shine effect
      const shine = document.createElement("div");
      shine.className = "shine";
      shine.style.left = `${
        ((e.clientX - cardRect.left) / cardRect.width) * 100
      }%`;
      shine.style.top = `${
        ((e.clientY - cardRect.top) / cardRect.height) * 100
      }%`;

      card.appendChild(shine);

      setTimeout(() => {
        shine.remove();
      }, 1000);
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
      setTimeout(() => {
        card.style.transform = "";
      }, 300);
    });
  });

  // Add parallax effect to hero section
  const heroSection = document.querySelector(".hero-section");
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    if (heroSection) {
      heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
  });

  // Add custom cursor effect
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", function (e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  document.addEventListener("mousedown", function () {
    cursor.classList.add("active");
  });

  document.addEventListener("mouseup", function () {
    cursor.classList.remove("active");
  });

  // Add hover effect to links
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("mouseenter", function () {
      cursor.classList.add("hover");
    });

    link.addEventListener("mouseleave", function () {
      cursor.classList.remove("hover");
    });
  });
});

// Custom cursor effect
document.addEventListener("mousemove", function (e) {
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";

  document.body.appendChild(cursor);

  setTimeout(function () {
    cursor.remove();
  }, 1000);
});
