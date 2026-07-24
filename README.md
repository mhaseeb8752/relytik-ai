# Relytik - Broker's Reliable Ticketing Solutions

Relytik is a modern corporate website and online profile designed for B2B client presentations, strategic partnership onboarding, and Delaware LLC registration purposes.

The application presents Relytik's mission-critical ticketing operations, carting, queuing, inventory management, and 24/7 virtual broker assistance solutions.

---

## 🛠 Tech Stack

- **HTML5**: Semantic, accessible structure
- **CSS3**: Standalone inline `<style>` blocks per page with CSS custom variables, modern layout math, and responsive design
- **Vanilla JavaScript**: Pure JS for dynamic component loading, mobile menu drawers, intersection observer animations, stats counter logic, FAQ accordions, and contact form validation
- **Zero Framework Dependencies**: No Bootstrap, Tailwind, React, Vue, jQuery, or external CDN libraries required.

---

## 📁 Project Structure

```text
relytik/
│
├── index.html            # Home page (Hero, Stats, Services, Workflow, Testimonials, CTAs)
├── about.html            # About Us (Story, Mission, Vision, Core Values, Timeline, FAQs)
├── services.html         # Detailed 12 Services & Solutions Cards with CTAs
├── partners.html         # Strategic Partnership ecosystem, Benefits, Case Studies
├── contact.html          # Interactive Contact Form & Wilmington, DE office details
├── 404.html              # Custom corporate error page
│
├── components/
│   ├── nav.html          # Reusable Navbar component
│   └── footer.html       # Reusable Multi-column Footer component
│
├── assets/
│   ├── logo-placeholder.svg # Vector Relytik brand logo
│   ├── favicon.ico       # SVG Favicon icon
│   └── js/
│       └── components.js # Vanilla JS fetch loader for nav & footer
│
├── robots.txt            # Search engine crawler instructions
├── sitemap.xml           # XML sitemap for SEO indexing
└── README.md             # Project documentation & deployment guidelines
```

---

## 🚀 Local Development & Setup

### 1. VS Code Setup (Recommended)
1. Open VS Code.
2. Select **File > Open Folder...** and choose the `relytik` root folder.
3. Install the **Live Server** extension by *Ritwick Dey* from the VS Code Extensions Marketplace (`Ctrl+Shift+X` or `Cmd+Shift+X`).
4. Open `index.html`.
5. Click **"Go Live"** in the bottom status bar or right-click `index.html` and select **"Open with Live Server"**.
6. Your default web browser will open `http://127.0.0.1:5500/index.html`.

---

## 📦 Version Control (Git & GitHub Setup)

### Initializing Git
```bash
# Initialize local repository
git init

# Add all project files
git add .

# Create initial commit
git commit -m "Initial commit: Relytik corporate profile website"
```

### Pushing to GitHub
1. Go to [GitHub](https://github.com) and create a new public or private repository named `relytik-website`.
2. Do not check "Initialize with README" as we already have one.
3. Link local git repository to GitHub and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/relytik-website.git
git branch -M main
git push -u origin main
```

---

## 🌐 Production Deployment Guidelines

### Option A: GitHub Pages
1. Navigate to your repository settings on GitHub (`https://github.com/YOUR_USERNAME/relytik-website/settings`).
2. Select **Pages** from the left sidebar navigation under "Code and automation".
3. Under **Build and deployment > Source**, choose **Deploy from a branch**.
4. Set Branch to `main` and folder to `/ (root)`.
5. Click **Save**. GitHub Pages will deploy your site in ~60 seconds to `https://YOUR_USERNAME.github.io/relytik-website/`.

### Option B: Cloudflare Pages
1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages**.
2. Click **Create Application > Pages > Connect to Git**.
3. Select your GitHub account and choose the `relytik-website` repository.
4. Set build settings:
   - **Framework preset**: None / Static
   - **Build command**: *(Leave blank)*
   - **Build output directory**: `/` or `.`
5. Click **Save and Deploy**. Cloudflare Pages will serve your site instantly across global edge locations with automatic SSL certificates.

---

## 🏢 Company Profile Summary

- **Legal Entity**: Relytik LLC
- **Registered Office**: 123 Business Avenue, Wilmington, Delaware 19801
- **Primary Contact Phone**: +1 (302) 555-0198
- **Primary Contact Email**: hello@relytik.com
- **Business Hours**: Mon - Fri: 8:00 AM - 8:00 PM EST (24/7 Support Desk for Active Clients)
