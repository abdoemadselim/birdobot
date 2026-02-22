# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BirdoBot (formerly PingPanda) is a SaaS event notification platform built with Next.js that delivers real-time events to multiple messaging channels (Discord, Telegram, Slack). Users create event categories with custom rules and send events via API, which are then dispatched to their configured messaging platforms.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TailwindCSS 4
- **Backend**: JStack (Hono-based framework), Next.js API Routes
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Auth**: Clerk
- **Payments**: Paddle
- **Messaging APIs**: Discord.js, node-telegram-bot-api, @slack/web-api
- **Testing**: Cypress (E2E and Component)

## Development Commands

```bash
# Development
npm run dev                 # Start Next.js dev server

# Database
npm run db:generate         # Generate Drizzle migrations from schema
npm run db:migrate          # Run migrations
npm run db:push             # Push schema directly without migrations
npm run db:studio           # Open Drizzle Studio GUI

# Build & Deploy
npm run build               # Build Next.js app
npm run start               # Start production server
npm run lint                # Run ESLint

# Testing
npm run cy:open             # Open Cypress test runner
```

## Architecture

### API Structure (JStack)

The backend uses **JStack** (wrapper around Hono) for type-safe API routes:

- **Entry Point**: `src/app/api/[[...route]]/route.ts` - Catches all API requests and routes through JStack
- **Router Config**: `src/server/index.ts` - Defines the main `appRouter` with merged sub-routers
- **Procedures**: `src/server/jstack.ts` - Defines middleware and base procedures:
  - `publicProcedure` - Database injection only
  - `privateProcedure` - Database + authentication (Clerk or API key)
- **Routers**: `src/server/routers/` - Domain-specific routers (auth, event, event-category, user, payment)

**Type-safe Client**: `src/lib/client.ts` creates a typed client from `AppRouter` for frontend API calls.

### Database Schema

Located in `src/server/db/schema.ts`:

- **userTable**: User accounts (Clerk integration), stores API keys, channel IDs (Discord, Telegram, Slack), tokens
- **eventCategoryTable**: User-defined event types with channels, colors, emojis, field rules, per-category channel overrides
- **eventTable**: Individual event occurrences with fields (JSONB), delivery status
- **userCreditsTable**: Credit balance per feature (`EVENTS`, `EVENTS_CATEGORIES`)
- **paymentTable**: Paddle payment transactions

**Key patterns**:
- Channel-specific IDs can be set at user level (default) or per-category (override)
- Field rules (JSONB) define validation/filtering logic for event fields
- Credits are decremented on event sends and category creation

### Event Flow

1. **Event Creation**: POST to `/api/v1/events` (route handler, not JStack)
2. **Authentication**: Validate API key via `birdo-api-key` header
3. **Credit Check**: Verify user has event credits
4. **Validation**: Check category exists, validate fields against field rules
5. **Dispatch**: Send to configured channels (Discord, Telegram, Slack) via client classes in `src/lib/*-client.ts`
6. **Credit Deduction**: Decrement user event credits

### App Router Structure

- **Landing Pages**: `src/app/(landing)/` - Public marketing pages
- **Auth Pages**: `src/app/(auth)/` - Sign-in, sign-up, welcome
- **Dashboard**: `src/app/dashboard/` - Main app interface
  - Settings routes use `(settings)` route group
  - Account routes use `(account)` route group
  - Dynamic category pages: `category/[name]/`
- **Webhooks**: `src/app/api/webhook/` - Clerk, Paddle, Slack, Telegram webhook handlers
- **Components**:
  - Recently refactored from single files to component folders with index.ts
  - Old single-file components were deleted (visible in git status)
  - New structure: `src/components/[component-name]/index.tsx`

### Authentication

- **Clerk** handles user auth with external IDs stored in `userTable.externalId`
- **API Key Auth**: Custom middleware checks `birdo-api-key` header for programmatic access
- Webhook at `/api/webhook/clerk` syncs Clerk users to database

### Messaging Integrations

Each platform has a client class:
- `DiscordClient` (src/lib/discord-client.ts) - Uses Discord REST API
- `TelegramBot` (src/lib/telegram-client.ts) - Uses node-telegram-bot-api
- `SlackClient` (src/lib/slack-client.ts) - Uses @slack/web-api

**Channel Configuration**:
- Users connect accounts via OAuth/bot tokens (stored in userTable)
- Categories can override channel targets (e.g., send "sale" events to specific Slack channel)
- Webhooks handle incoming data from Slack (`/api/webhook/slack`) and Telegram (`/api/webhook/telegram`)

### Field Rules System

Located in `src/lib/field-rules-validator.ts` and schema in `src/lib/schemas/category-event.ts`:

- Categories can define validation rules for event fields (text/number)
- Rules: eq, neq, gt, gte, lt, lte, contains, notContain, startsWith, endsWith
- Relevance: "and" (all must match) or "or" (any match)
- Evaluated in `/api/v1/events` before event creation

## Environment Variables

Key variables (see `.env.production` for production values):
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_API_URL` - API base URL
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` - Clerk auth
- `DISCORD_TOKEN` - Bot token for Discord API
- `TELEGRAM_TOKEN` - Bot token for Telegram API
- `PADDLE_API_KEY`, `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` - Payment processing
- Slack tokens: `SLACK_BOT_USER_TOKEN`, `NEXT_PUBLIC_SLACK_CLIENT_ID`

## Important Patterns

### Adding New API Endpoints

1. **JStack Routes** (for type-safe client usage):
   - Add procedure to relevant router in `src/server/routers/`
   - Use `privateProcedure` for auth, `publicProcedure` for public endpoints
   - Define input schema with Zod
   - Client automatically gets types from `AppRouter`

2. **Direct Route Handlers** (webhooks, external APIs):
   - Create in `src/app/api/[route]/route.ts`
   - Used for webhooks where type-safety isn't needed

### Database Queries

- Use Drizzle ORM with imported schema from `src/server/db/schema.ts`
- Complex aggregations use raw SQL with `sql` template tag
- Always handle cascade deletes (categories cascade to events)

### Credit Management

- Check credits before operations (categories, events)
- Use SQL `${userCreditsTable.balance} - 1` for atomic updates
- Include `gte(userCreditsTable.balance, 0)` in WHERE clause

## Testing

Cypress configured for both E2E and component testing:
- Config: `cypress.config.ts`
- E2E tests: `cypress/e2e/*.cy.ts`
- Component setup: `cypress/support/component.tsx`

## Component Organization

Components are being migrated to folder structure:
- Old: `src/components/component-name.tsx`
- New: `src/components/component-name/index.tsx`

This allows co-locating related files (hooks, utils, styles) with components.
