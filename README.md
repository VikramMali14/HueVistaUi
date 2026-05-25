# HueVista UI

Frontend for HueVista — AI-Powered Paint Shade Visualizer for Indian Paint Retailers.

Built with Next.js 14, TypeScript, Tailwind CSS, TanStack Query, Zustand, Framer Motion.

## Structure

```
src/
├── app/
│   ├── (marketing)/   # Landing, pricing pages
│   ├── (auth)/        # Login, register
│   └── (app)/         # Dashboard, projects, catalog, settings
├── components/
│   ├── marketing/     # Hero, Features, HowItWorks, Pricing, Navbar, Footer
│   ├── auth/          # LoginForm, RegisterForm
│   └── app/           # Sidebar, ProjectEditor, ShadePanel, etc.
├── lib/               # API client, auth utils
├── hooks/             # useAuth, useProject
└── types/             # TypeScript interfaces
```

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```
