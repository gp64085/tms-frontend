# TMS Frontend

Transport Management System frontend built with React, TypeScript, and GraphQL.

## Features

- **Dashboard**: View and manage shipments in grid/tile view
- **Inline Status Editing**: Click status badges to update shipment status
- **Authentication**: JWT-based login system
- **Real-time Updates**: GraphQL mutations with cache updates
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

- React 18 + TypeScript
- Apollo Client (GraphQL)
- Tailwind CSS
- Vite
- React Router

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Start development server:
```bash
pnpm run dev
```

3. Build for production:
```bash
pnpm run build
```

## Environment Variables

Create `.env` file:
```
VITE_API_URL=http://localhost:4000/
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── features/           # Feature-specific components
├── pages/              # Route components
├── graphql/            # GraphQL queries/mutations
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
└── constants/          # App constants
```

## Authentication

Default credentials:
- Username: `admin` / Password: `admin@123`
- Username: `john` / Password: `john@123`
