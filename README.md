# EduMapper - The Comeback 🎓

A modern Nuxt 4 application for exploring and evaluating admission probabilities for educational programs. Built with Vue 3, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (recommended: latest LTS version)
- npm, pnpm, yarn, or bun

### Installation

Clone the repository and install dependencies:

```bash
# Using npm
npm install

# Using pnpm
pnpm install

# Using yarn
yarn install

# Using bun
bun install
```

### Development Server

Start the development server:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Architecture

This project follows a modern, scalable architecture using **Atomic Design** principles and **Nuxt 4** conventions.

### Directory Structure

```
edumapper-the-comeback/
├── app/
│   ├── app.vue              # Main application wrapper
│   ├── assets/
│   │   └── css/
│   │       └── main.css     # Global styles and Tailwind config
│   └── components/
│       ├── atoms/           # Smallest reusable components
│       │   ├── Button.vue
│       │   ├── ButtonChip.vue
│       │   ├── ContainerCategory.vue
│       │   ├── FileImport.vue
│       │   ├── SchoolCard.vue
│       │   └── ...
│       └── organism/        # Complex composite components
│           ├── CookingStep1.vue  # Step 1: Class & Speciality selection
│           ├── CookingStep2.vue  # Step 2: File upload
│           └── CookingStep3.vue # Step 3: Results display
├── server/
│   ├── api/                # API endpoints (auto-imported)
│   │   ├── school.ts
│   │   ├── classe.ts
│   │   ├── bac.ts
│   │   └── specialities.ts
│   └── data/               # Mock data
│       ├── schools.ts
│       ├── classe.ts
│       ├── bac.ts
│       └── specialities.ts
├── public/                 # Static assets
│   ├── favicon.ico
│   └── robots.txt
├── nuxt.config.ts         # Nuxt configuration
└── package.json           # Dependencies and scripts
```

## 🏗️ Architecture Overview

### Frontend Architecture

**Component Hierarchy:**

- **Atoms**: Basic building blocks (Button, ButtonChip, etc.)
- **Organisms**: Complex components that orchestrate multiple atoms (CookingStep1, CookingStep2, CookingStep3)

**Key Features:**

- **Multi-step Wizard**: Three-step process for gathering user input
- **Dynamic School Selection**: Random school on load with ability to change
- **File Upload Simulation**: Mock file import with confetti animation
- **Probability Display**: Visual representation of admission chances

### Backend Architecture

**API Routes:**

- `GET /api/school` - Returns list of schools
- `GET /api/classe` - Returns available class levels
- `GET /api/bac` - Returns baccalaureate types
- `GET /api/specialities` - Returns available specialities

**Data Layer:**

- Mock data stored in `server/data/`
- Easy to extend with real database integration

### Application Flow

```
1. Step 1 (CookingStep1)
   ├── Display SchoolCard (random school)
   ├── User selects class level
   ├── User selects bac type
   └── User selects speciality
   └── Click "Confirmer" → Step 2

2. Step 2 (CookingStep2)
   ├── Display SchoolCard (with editing capability)
   ├── FileImport component
   │   ├── Upload fake file
   │   ├── Import button → Confetti animation
   │   └── Success message
   └── Click "Suivant" → Step 3

3. Step 3 (CookingStep3)
   ├── Display school information
   ├── Show probability result (91%)
   ├── Display reliability rating
   └── "Tester une autre formation" → Refresh page
```

## 🛠️ Tech Stack

- **Framework**: Nuxt 4
- **Runtime**: Vue 3.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Nuxt UI
- **Icons**: Iconify (via Nuxt UI)
- **Build Tool**: Vite
- **Deployment**: Vercel

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Generate Static Site

```bash
npm run generate
```

## 🔧 Configuration

### Nuxt Configuration (`nuxt.config.ts`)

- Compatibility date: 2025-07-15
- DevTools enabled
- Modules: ESLint, UI, Image optimization
- CSS: Tailwind via `main.css`

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

Private project - All rights reserved

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
# Kill the process
lsof -ti:3000 | xargs kill

# Or run on different port
PORT=3001 npm run dev
```

### Module Not Found Errors

Clear cache and reinstall:

```bash
rm -rf node_modules .nuxt
npm install
```

## 📚 Additional Resources

- [Nuxt Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Nuxt UI Documentation](https://ui.nuxt.com/)
