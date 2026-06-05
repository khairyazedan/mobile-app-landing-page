# 📱 Mobile App Landing Page

A modern, fully responsive single-page landing section built with **React** and **Vite** to promote a mobile application. Includes a hero section, key features, app screenshot mockups, and a prominent CTA download section.

🔗 **Live Demo:** [mobile-app-landing-page-eight.vercel.app](https://mobile-app-landing-page-eight.vercel.app/)

---

## ✨ Features

- 🎨 Clean light theme with soft purple/lavender palette
- 📱 Fully responsive across all devices — mobile, tablet, desktop
- 🖥️ Fixed navigation bar with smooth scroll and active link highlighting
- 🦸 Hero section with animated badge, headline, dual CTA buttons, and store badges
- ⚡ Features section with 4 icon cards
- 📸 App screenshots — 5 realistic phone mockups with actual UI content
- 🟣 CTA download banner with App Store and Google Play buttons
- 🦶 Footer with 4 columns — Product, Company, Support, Follow Us
- 🎬 Scroll reveal animations on all sections
- 🍔 Hamburger menu for mobile with animated open/close

---

## 🛠️ Tech Stack

- **React 18** — component-based UI
- **Vite** — fast development and build tool
- **Tailwind CSS** — utility classes where needed
- **Vercel** — deployment and hosting

---


## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/khairyazedan/mobile-app-landing-page.git

# Navigate into the client folder
cd mobile-app-landing-page/client

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🎨 Customization

All page content — text, links, features, and screenshots — is centralized in one file:

```
src/data/index.js
```

To update the landing page for a different app just edit:

```javascript
export const HERO = {
  badge: '✨ Your tagline here',
  headline: ['Your Headline', 'Your Accent Line'],
  description: 'Your app description...',
  ...
}

export const FEATURES = [
  { icon: '🚀', title: 'Feature Name', description: 'Feature description' },
  ...
]
```

No need to touch any component files.

---

## 🌐 Deployment

This project is deployed on **Vercel** with automatic deployments on every push to `main`.

The `vercel.json` at the root handles SPA routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

To deploy your own copy:

1. Fork this repo
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Set **Root Directory** to `client`
4. Click Deploy

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
