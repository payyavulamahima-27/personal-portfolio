/*
  script.js - Personal Portfolio
  1. Mobile menu (open / close / close on link click)
  2. Active link highlight while scrolling
  3. Navbar shadow + back-to-top button
  4. Reveal animation + skill bars on scroll
  5. Profile image fallback
  6. Contact form validation
  7. Footer year
*/

// Find the elements we need (document.getElementById / querySelector)
var navbar = document.getElementById("navbar");
var hamburger = document.getElementById("hamburger");
var navMenu = document.getElementById("navMenu");
var navLinks = document.querySelectorAll(".nav-link");
var sections = document.querySelectorAll("section[id]");
var toTop = document.getElementById("toTop");

/* ---------- 1. MOBILE MENU ---------- */
function openMenu() {
    navMenu.classList.add("open");
    hamburger.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
}

function closeMenu() {
    navMenu.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
}

// Click the hamburger: open if closed, close if open
hamburger.addEventListener("click", function () {
    if (navMenu.classList.contains("open")) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Close the menu when any link is clicked
for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", closeMenu);
}

// Close the menu if the window becomes wide (e.g. phone rotated)
window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

/* ---------- 2 & 3. SCROLL EFFECTS ---------- */
function highlightActiveLink() {
    var scrollPosition = window.scrollY + 120;   // 120 = navbar height + a little extra
    var currentId = "home";

    // Loop through all sections and find the one we are inside
    for (var i = 0; i < sections.length; i++) {
        if (scrollPosition >= sections[i].offsetTop) {
            currentId = sections[i].id;
        }
    }

    // Reached the bottom of the page? Highlight the last section.
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {
        currentId = sections[sections.length - 1].id;
    }

    for (var j = 0; j < navLinks.length; j++) {
        navLinks[j].classList.remove("active");
        if (navLinks[j].getAttribute("href") === "#" + currentId) {
            navLinks[j].classList.add("active");
        }
    }
}

function handleScroll() {
    highlightActiveLink();

    // Shadow under the navbar after scrolling a little
    if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // Show the back-to-top button after scrolling down
    if (window.scrollY > 400) {
        toTop.classList.add("show");
    } else {
        toTop.classList.remove("show");
    }
}

window.addEventListener("scroll", handleScroll);
handleScroll(); // run once when the page loads

toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------- 4. REVEAL ON SCROLL + SKILL BARS ---------- */
var revealItems = document.querySelectorAll(".reveal");
var skillFills = document.querySelectorAll(".skill-fill");

function animateSkill(skillElement) {
    var fill = skillElement.querySelector(".skill-fill");
    if (fill) {
        fill.style.width = fill.getAttribute("data-level") + "%";
    }
}

if ("IntersectionObserver" in window) {
    // The browser tells us when an element enters the screen
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                animateSkill(entry.target);
                observer.unobserve(entry.target);   // animate only once
            }
        });
    }, { threshold: 0.15 });

    revealItems.forEach(function (item) {
        observer.observe(item);
    });
} else {
    // Very old browsers: just show everything
    revealItems.forEach(function (item) {
        item.classList.add("visible");
    });
    skillFills.forEach(function (fill) {
        fill.style.width = fill.getAttribute("data-level") + "%";
    });
}

/* ---------- 5. PROFILE IMAGE FALLBACK ---------- */
// If images/profile.jpg is missing, hide the broken image and show initials instead.
function showPlaceholder(img) {
    img.style.display = "none";
    var placeholder = img.nextElementSibling;
    if (placeholder) {
        placeholder.hidden = false;
    }
}

document.querySelectorAll(".profile-img").forEach(function (img) {
    img.addEventListener("error", function () { showPlaceholder(img); });
    // The error may already have happened before this script ran
    if (img.complete && img.naturalWidth === 0) {
        showPlaceholder(img);
    }
});

/* ---------- 6. CONTACT FORM VALIDATION ---------- */
var form = document.getElementById("contactForm");
var successBox = document.getElementById("formSuccess");

function showError(fieldId, message) {
    var field = document.getElementById(fieldId);
    document.getElementById(fieldId + "Error").textContent = message;
    field.parentElement.classList.add("invalid");
}

function clearError(fieldId) {
    var field = document.getElementById(fieldId);
    document.getElementById(fieldId + "Error").textContent = "";
    field.parentElement.classList.remove("invalid");
}

// Simple email check: something@something.something
function isValidEmail(email) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// Returns true if everything is OK
function validateForm() {
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();
    var ok = true;

    clearError("name");
    clearError("email");
    clearError("message");

    if (name === "") {
        showError("name", "Please enter your name.");
        ok = false;
    } else if (name.length < 2) {
        showError("name", "Name must be at least 2 characters.");
        ok = false;
    }

    if (email === "") {
        showError("email", "Please enter your email.");
        ok = false;
    } else if (!isValidEmail(email)) {
        showError("email", "Please enter a valid email address.");
        ok = false;
    }

    if (message === "") {
        showError("message", "Please write a message.");
        ok = false;
    } else if (message.length < 10) {
        showError("message", "Message must be at least 10 characters.");
        ok = false;
    }

    return ok;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();          // stop the page from reloading
    successBox.hidden = true;

    if (validateForm()) {
        // There is no server in this project, so we only show a success message.
        // (See README to learn how to really receive messages.)
        var name = document.getElementById("name").value.trim();
        successBox.textContent = "Thank you, " + name + "! Your message has been sent.";
        successBox.hidden = false;
        form.reset();
    }
});

// Remove the red error as soon as the user starts typing again
["name", "email", "message"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", function () {
        clearError(id);
    });
});

/* ---------- 7. FOOTER YEAR ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
