# Moden Kate Store

A premium tech accessories e-commerce store featuring smart watches, chargers, and audio gear with a modern, nature-inspired aesthetic.

## About

Moden Kate Store is a modern e-commerce platform built with React and TypeScript, showcasing a curated collection of high-quality tech accessories. The store features an interactive product showcase, lifestyle imagery, and a seamless checkout experience.

## Features

- 🛍️ **Product Showcase** - Interactive product cards with detailed specifications
- 🎨 **Modern Design** - Nature-inspired aesthetic with smooth animations
- 📱 **Responsive Layout** - Mobile-friendly interface with responsive components
- 🏷️ **Category Grid** - Easy product browsing by category
- 🎯 **Interactive Hero Section** - Engaging landing page with call-to-action
- 💳 **Checkout System** - Streamlined payment and order processing
- 👨‍💼 **Admin Dashboard** - Manage products and orders
- ⚡ **Performance** - Built with Vite for fast development and production builds

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Routing**: React Router
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Node.js/Express (included)
- **Database**: SQLite

## Project Structure

```
├── components/          # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── ProductCard.tsx
│   ├── CategoryGrid.tsx
│   ├── TechSpecs.tsx
│   ├── InteractiveShowcase.tsx
│   ├── LifestyleSection.tsx
│   ├── UnboxingScroll.tsx
│   └── Footer.tsx
├── pages/               # Page components
│   ├── Home.tsx
│   ├── Admin.tsx
│   └── Checkout.tsx
├── context/             # React context
│   └── StoreContext.tsx
├── server/              # Backend server
│   └── index.js
├── database/            # Database schema
│   └── schema.sql
├── App.tsx              # Main app component
├── index.tsx            # Entry point
└── types.ts             # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd moden-kate-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server with hot module replacement
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally

## Components

### Core Components

- **Header** - Navigation bar with branding and links
- **Hero** - Eye-catching landing section
- **ProductCard** - Individual product display with details
- **CategoryGrid** - Product filtering by category
- **TechSpecs** - Technical specifications display
- **InteractiveShowcase** - Interactive product demonstrations
- **LifestyleSection** - Lifestyle and use-case imagery
- **UnboxingScroll** - Scrollable unboxing experience
- **Footer** - Site footer with links and information

## Pages

- **Home** - Main landing page showcasing featured products
- **Admin** - Administrative dashboard for store management
- **Checkout** - Shopping cart and payment processing

## Configuration

- **TypeScript**: Configured in [tsconfig.json](tsconfig.json)
- **Vite**: Configured in [vite.config.ts](vite.config.ts)
- **Environment**: See [constants.ts](constants.ts) for app configuration

## Database

The store uses SQLite with schema defined in [database/schema.sql](database/schema.sql). Run migrations as needed during setup.

## Development

### Code Style

- TypeScript for type safety
- React functional components with hooks
- Framer Motion for animations
- Tailwind CSS-ready (can be added)

### Adding New Products

Products are managed through the Admin dashboard or directly in the database using the schema in `database/schema.sql`.

## Performance

Built with Vite for optimal performance:
- Fast cold start time
- Instant HMR (Hot Module Replacement)
- Optimized production builds
- CSS code splitting

## Contributing

Contributions are welcome! Please follow the existing code style and structure.

## License

This project is private and proprietary.

## Support

For issues or questions, please create an issue in the repository or contact the development team.
