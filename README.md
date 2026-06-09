# 🎁 Gift Registry

A modern, fast gift registry website built with React and Vite. Create, manage, and share your gift wishlists with ease.

## Features

- ✨ Create multiple gift lists
- 🎯 Add/edit/delete gifts with details (price, category, priority)
- 💰 Automatic price tracking and totals
- 🔗 Add product links to gifts
- 💾 Persistent storage with localStorage (browser-based)
- 📱 Responsive design with Tailwind CSS
- 🚀 Production-ready for Vercel deployment

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Deployment to Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy
vercel
```

### Option 2: GitHub + Vercel Web

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Vercel auto-detects Vite and deploys automatically

## Tech Stack

- **React 18** - UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **localStorage** - Client-side data persistence

## File Structure

```
gift-registry/
├── src/
│   ├── components/
│   │   ├── ListManager.jsx    # List creation & management
│   │   ├── RegistryView.jsx   # Registry view with stats
│   │   ├── GiftForm.jsx       # Form for adding/editing gifts
│   │   └── GiftCard.jsx       # Individual gift display
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # React entry point
│   └── index.css              # Tailwind imports
├── index.html                 # HTML entry point
├── package.json               # Dependencies
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
└── vercel.json                # Vercel deployment config
```

## Next Steps

- **Firebase Integration**: To add cloud storage and authentication, install Firebase and connect it
- **Sharing**: Add functionality to generate shareable links
- **User Accounts**: Implement authentication for multi-user support

## License

MIT
