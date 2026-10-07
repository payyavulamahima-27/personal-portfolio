# Personal Portfolio Website

A responsive personal portfolio built with **only HTML5, CSS3 and vanilla JavaScript**.
No frameworks, no build tools, no installation - just open `index.html`.

## Folder structure

```
Personal_Portfolio/
├── index.html        # All the page content (Home, About, Skills, Projects, Contact)
├── css/
│   └── style.css     # All styling, colours (CSS variables) and responsive rules
├── js/
│   └── script.js     # Menu, scroll effects, animations, form validation
├── images/
│   └── profile.jpg   # Your photo (currently a placeholder)
└── README.md
```

## How to run (Windows + VS Code)

**Option A - simplest:** open the `Personal_Portfolio` folder in File Explorer and double-click `index.html`.

**Option B - VS Code with Live Server (auto-refresh on save):**
1. Unzip the project, then in VS Code choose **File > Open Folder...** and select `Personal_Portfolio`.
2. Open the **Extensions** panel (`Ctrl + Shift + X`), search for **Live Server** (by Ritwick Dey) and install it.
3. Right-click `index.html` in the Explorer and choose **Open with Live Server**.
4. The site opens at `http://127.0.0.1:5500`. Every time you save a file, the page refreshes.

## How to personalise it (do this before submitting!)

| What to change | Where |
|----------------|-------|
| Your name (`[YOUR NAME]`) | `index.html` - search with `Ctrl + F` (appears in the `<title>`, logo, hero, about, footer, image alt text) |
| Initials shown if the photo is missing (`YN`) | `index.html` - search `YN` |
| Introduction, education, interests, strengths | `index.html` - the **ABOUT ME** section |
| Skills and percentages | `index.html` - **SKILLS** section. Change both the visible `90%` text and `data-level="90"` |
| Projects (title, text, tags, links) | `index.html` - **PROJECTS** section. Replace each `href="#"` with your real GitHub/demo link |
| Email, phone, city, social links | `index.html` - **CONTACT** section |
| Colours | `css/style.css` - the `:root { ... }` block at the top (`--primary`, `--accent`) |

### Adding your own profile photo
1. Pick a square-ish photo (about 600 x 600 pixels works well).
2. Rename it exactly **`profile.jpg`**.
3. Copy it into the `images` folder and replace the existing placeholder file.
4. Refresh the browser (`Ctrl + F5`).

If you want to use a `.png` instead, change `images/profile.jpg` to `images/profile.png` in the two `<img>` tags in `index.html`.
If the image file is ever missing, the website automatically shows your initials in a circle instead of a broken image.

## Features

- Fixed navigation bar with smooth scrolling to every section
- Active section highlighted in the menu while scrolling
- Hamburger menu on mobile (opens, closes, and closes when a link is clicked)
- Hero section with entrance animation and two buttons
- About section with education, career interests and strengths
- Animated skill bars and tag list
- Project cards with hover effects
- Contact form with JavaScript validation (name, email format, message length)
- Back-to-top button, scroll-reveal animations, and respect for "reduce motion" settings
- Responsive layout for desktop, tablet and mobile

## How the three languages work together

| Language | Job | Example in this project |
|----------|-----|-------------------------|
| HTML | Structure and content | `<section id="skills">` holds the skills |
| CSS | Appearance and layout | `@media (max-width: 768px)` turns the menu into a hamburger |
| JavaScript | Behaviour | `script.js` opens the menu and checks the form |

Quick tour of the code:
- **CSS variables** (`--primary`) store colours once and reuse them everywhere.
- **Flexbox** lays out the navbar and buttons; **CSS Grid** lays out cards and skills.
- **Media queries** at 900px, 768px and 600px adapt the design to tablets and phones.
- **JavaScript functions** such as `openMenu()`, `closeMenu()`, `highlightActiveLink()` and `validateForm()` each do one clear job.
- **IntersectionObserver** tells JavaScript when a section scrolls into view, so it can play the reveal animation and fill the skill bars.

## Contact form note

This is a static website, so there is no server to receive messages. When the form is valid it only shows a
success message on screen. To receive real messages later you can:
- change the "Email" link to `mailto:` (simple), or
- connect the form to a free form service such as Formspree or Netlify Forms.

## Testing checklist

- [ ] Open `index.html` directly in Chrome and Edge - no errors in the console (`F12` > Console)
- [ ] Click each menu item - the page scrolls smoothly and the clicked link is highlighted
- [ ] Scroll slowly - the highlighted link changes with the section
- [ ] "View My Projects" goes to Projects; "Contact Me" goes to Contact
- [ ] Press `F12`, click the phone/tablet icon (device toolbar), choose iPhone and iPad sizes:
  - [ ] Hamburger menu appears, opens, and closes after tapping a link
  - [ ] No sideways scrolling, text is readable, buttons are easy to tap
- [ ] Submit the form empty - three red error messages appear
- [ ] Enter a wrong email like `abc` - "valid email" error appears
- [ ] Fill the form correctly - green success message appears and the form clears
- [ ] Temporarily rename `profile.jpg` - initials appear instead of a broken image (rename it back afterwards)

## AI-Assisted Activity

Record your own prompts and results here (take screenshots for your report). Examples to get you started:

### 1. Generate webpage layouts using AI prompts
- *Prompt used:* "Create a responsive personal portfolio layout using only HTML, CSS and vanilla JavaScript with Home, About, Skills, Projects and Contact sections and a sticky navbar."
- *What the AI produced:* the section structure, CSS Grid/Flexbox layouts, colour palette with CSS variables.
- *What I checked/changed:* [write what you changed, e.g. colours, text, section order]

### 2. Use AI to improve responsiveness
- *Prompt used:* "My hero section looks cramped on phones. Suggest CSS media queries to make the layout stack vertically and the menu a hamburger."
- *Result in this project:* breakpoints at 900px (tablet), 768px (hamburger menu) and 600px (small phones); the profile photo moves above the text on small screens.
- *What I checked:* tested with the browser device toolbar (`F12`) on several screen sizes.

### 3. Use AI to troubleshoot UI issues
- *Example issue found while building:* on mobile the hamburger button appeared in the middle of the navbar instead of the right edge.
- *Cause:* the empty `<nav>` wrapper was taking up a space in the flex row, so `space-between` pushed the button towards the centre.
- *Fix:* `margin-left: auto;` on `.hamburger` inside the mobile media query.
- *Other prompts to try:* "Why does my fixed navbar cover the section titles?" (answer: use `scroll-margin-top`), "Why doesn't my menu close after clicking a link?" (answer: add a click listener on each link).

### Reflection (write in your own words)
- What did the AI do well? Where was it wrong or too complicated?
- What did you change so that the site is truly yours?
- Can you explain every part of `style.css` and `script.js`? (Your teacher may ask!)

## Common problems and fixes

| Problem | Fix |
|---------|-----|
| Changes don't show | Save the file (`Ctrl + S`) and hard-refresh with `Ctrl + F5` |
| Photo not showing | File must be named exactly `profile.jpg` and be inside `images/` |
| Layout looks broken | Make sure the folder names are `css` and `js` and files are `style.css` and `script.js` |
| Menu doesn't open on phone view | Open DevTools console (`F12`) and check for red errors; make sure `script.js` is linked at the bottom of `index.html` |
| Smooth scroll not working | Some browsers disable it when "reduce motion" is on in system settings |

## Future improvements

Dark mode toggle, a project filter (by technology), downloadable resume button, real contact form service, and publishing on GitHub Pages.
