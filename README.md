# Frontend - Next.js

Professional Next.js frontend application with TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **State Management**: Zustand
- **Form Validation**: Zod

## Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   └── ...             # Custom components
│   ├── lib/                # Utility functions and configurations
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API service layers
│   ├── store/              # State management (Zustand)
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Helper functions
│   ├── config/             # App configuration
│   └── styles/             # Global styles
├── public/                 # Static assets
└── tests/                  # Test files
```

## Getting Started

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm start
```

## Environment Variables

Copy `.env.local` and update with your configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check
