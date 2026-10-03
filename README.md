# 🚀 Rajan Chauhan - Modern Portfolio Website

A high-performance, responsive, and animated personal portfolio website designed with a dark/light mode tech aesthetic, smooth scroll reveal animations, and a touch-enabled sliding container (carousel) for showcasing featured projects.

---

## 🌟 Key Features

### 1. 🏠 Home / Hero Section
- **Dynamic Typing Animation:** Displays rotating expertise titles (Full Stack, Generative AI, APIs, UI/UX, Cloud).
- **Interactive Background:** HTML5 Canvas particle network that moves dynamically with connecting nodes.
- **Hero Visual:** Portrait avatar with animated glow rings and 3 floating interactive badges.
- **Quick Connect:** Social profile icons (GitHub, LinkedIn, Twitter/X, Email).
- **Tech Stack Ticker:** Infinite marquee scrolling across modern languages and frameworks.

### 2. 👤 About Me Section
- **Story & Philosophy:** Overview of engineering experience, values, and principles.
- **Animated Stats Counters:** Real-time counting animation (Years of Experience, Projects Completed, Satisfied Clients, Git Commits).
- **Experience Timeline:** Vertical chronological milestones with glowing indicators.
- **Highlights Grid:** Pixel perfection, scalable backend, security standards, and modern tech.

### 3. 💻 Projects Section with Sliding Container (Carousel)
- **Sliding Container:** Smooth hardware-accelerated carousel with track sliding.
- **Mobile Touch & Swipe Support:** Native touch swipe gesture detection on smartphones and tablets.
- **Desktop Drag & Keyboard:** Click-and-drag slider support, plus Left/Right arrow keys.
- **Autoplay with Progress Bar:** 6-second auto-slide timer with visual progress bar and pause/play toggle.
- **Category Filter Tabs:** Filter projects dynamically by `All`, `Full Stack`, `AI / ML`, `Fintech`, and `SaaS`.
- **Case Study Modal Popup:** In-depth modal with problem statement, architecture solution, tech specs, key capabilities, and source links.

### 4. ⚡ Skills Section
- **Categorized Expertise:** Frontend Engineering, Backend & APIs, and Cloud / DevOps.
- **Animated Skill Bars:** Gradient percentage progress indicators with smooth load animations.

### 5. 📬 Contact Page / Section
- **Direct Contact Cards:** Email with **one-click "Copy to Clipboard"**, Phone/WhatsApp, Location, and Real-time Status Badge.
- **Interactive Form:** Real-time field validation with custom regex, error highlighting, submit button loading spinner, and success feedback banner.
- **Toast Notification System:** Non-intrusive floating feedback alerts for actions like copying email, theme changes, and form submissions.

### 6. 🎨 Additional Enhancements
- **Dark / Light Mode Toggle:** Smooth theme switcher persisting user choice in `localStorage`.
- **Scroll Spy Navigation:** Active section detection in sticky navbar and mobile menu.
- **Mobile Friendly:** Fully responsive mobile hamburger drawer with backdrop blur.
- **Zero Heavy Dependencies:** Written in standard HTML5, CSS3, and modern Vanilla ES6+ JavaScript.

---

## 📁 File Structure

```text
├── index.html              # Main semantic HTML5 webpage
├── style.css               # Modern CSS with custom variables, animations, and media queries
├── script.js               # Slider, particles, validation, theme switcher, modal logic
├── README.md               # Documentation and customization guide
└── assets/
    └── images/
        ├── avatar.jpg            # Developer profile portrait
        ├── project_ai.jpg        # Nexus AI Studio preview
        ├── project_ecommerce.jpg # Nova Market E-Commerce preview
        ├── project_fintech.jpg   # CryptoFlow Terminal preview
        └── project_taskflow.jpg  # Synergy Workspace preview
```

---

## 🚀 How to Run Locally

### Option 1: Direct File Opening
Double-click `index.html` in your file explorer or open it directly in any modern browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Recommended)
Using Python:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

Using Node.js:
```bash
npx serve .
```

---

## 🛠️ How to Customize

1. **Change Name & Bio:**
   Open `index.html` and edit lines containing `Rajan Chauhan` or `Rajan.dev`.
2. **Add / Modify Projects:**
   - In `index.html`, add or edit `.project-slide` containers under `#sliderTrack`.
   - In `script.js`, customize the `projectDetailsData` object with your project details and case studies.
3. **Change Images:**
   Replace the images in `assets/images/` with your own project screenshots or photos.
4. **Theme Colors:**
   Edit the `--primary` and `--secondary` hex codes in `style.css` under `:root`.

---

## 🌐 Free Deployment Options

- **GitHub Pages:** Push to a GitHub repository, go to **Settings > Pages**, and select the `main` branch.
- **Vercel / Netlify:** Drag and drop the folder into [Netlify Drop](https://app.netlify.com/drop) or import the Git repo into Vercel.
