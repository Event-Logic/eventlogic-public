# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

### Common Operations
```bash
npm install          # Install dependencies
npm run build && npm start  # Test production build locally
```

## Architecture Overview

This is a Next.js 15.2.3 application using App Router with internationalization support for English and Swedish.

### Key Technologies
- **Framework**: Next.js with App Router (React 19)
- **Language**: TypeScript with strict mode
- **Styling**: TailwindCSS + shadcn/ui components
- **Internationalization**: next-intl with URL-based routing
- **State Management**: React Context (cart, dark mode)

### Project Structure
- `src/app/[locale]/` - Dynamic locale routing for all pages
- `src/components/` - Reusable components (server components by default)
- `src/components/ui/` - shadcn/ui base components
- `messages/` - Translation files organized by language and namespace
- `src/dictionaries/` - Legacy translation system (being migrated to messages/)
- `src/features/` - Feature-specific modules (e.g., event-builder)

### Internationalization Pattern
When adding new pages or components:
1. Create route under `src/app/[locale]/your-page/page.tsx`
2. Add translations to `messages/en/your-namespace.json` and `messages/sv/your-namespace.json`
3. Use `useTranslations('your-namespace')` hook in client components
4. Use `await getTranslations('your-namespace')` in server components
5. Update `i18n.ts` pathnames for URL localization

**Important**: Follow the pattern in `src/app/[locale]/buyers/page.tsx` for new pages - it demonstrates the correct implementation with proper metadata, translations, and SEO setup. Avoid the older `getDictionary` pattern still present in some pages.

### Component Patterns
- Server Components are default - use `"use client"` directive only when needed
- Metadata is generated dynamically using Next.js `generateMetadata` function
- Forms use React Hook Form with Zod validation
- UI components from shadcn/ui should be imported from `@/components/ui`

### Important Files
- `i18n.ts` - Internationalization routing configuration
- `middleware.ts` - Handles locale routing
- `src/app/[locale]/layout.tsx` - Root layout with providers
- `next.config.ts` - Next.js configuration with redirects

### SEO Considerations
- Each page should export `generateMetadata` for dynamic metadata
- Use `generateAlternates()` helper for language alternates
- Include structured data (JSON-LD) where appropriate
- **Template Page**: `src/app/[locale]/buyers/page.tsx` demonstrates the modern pattern:
  - Proper `generateMetadata` with canonical URLs and language alternates
  - Uses `getTranslations` from next-intl/server (not `getDictionary`)
  - Clean namespace-based translations
  - Correct handling of different URLs per language (e.g., /buyers vs /kopare)