# Ethereum News Aggregator Frontend

A Next.js application that aggregates and displays news from the Ethereum ecosystem and other blockchain networks.

## Features

- News aggregation from trusted sources
- Weekly news digest organized by blockchain network
- Category-based organization of news items
- Responsive design for all devices

## News Display Logic

The application implements a specific weekly news display system with the following characteristics:

### Configuration

The news display system is configured in `app/config/news-config.ts`:

```typescript
export const newsConfig = {
  // Day of week for news release (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  releaseDay: 0, // Sunday

  // First day of week for weekly news aggregation (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  weekStartDay: 1, // Monday

  // Last day of week for weekly news aggregation (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  weekEndDay: 0, // Sunday
};
```

This configuration ensures that:

- News is released on Sundays (configurable)
- Each news week spans from Monday to Sunday (configurable)

### Date Utilities

The date handling logic is implemented in `app/utils/dateUtils.ts`:

1. `getDateRangeForWeek(year, month, week)`: Calculates the start (Monday) and end (Sunday) dates for a specific week in a month.

2. `getWeekNumberInMonth(date)`: Determines which week a date belongs to within its month, respecting the Monday-Sunday week boundaries.

3. `getMostRecentReleaseDay(date)`: Finds the most recent release day (Sunday) on or before the given date.

4. `getStartOfWeek(date)` & `getEndOfWeek(date)`: Calculate the Monday and Sunday boundaries of the week containing the given date.

### Navigation Flow

1. **Homepage Redirection**:

   - When a user visits the root URL, they are redirected to the latest blockchain news page
   - The redirection is handled in `app/page.tsx`

2. **Chain Page Handling**:

   - The `app/[chain]/page.tsx` component finds the most recent release day (Sunday)
   - It then redirects to the appropriate year/month/week path

3. **Week View**:
   - The `app/[chain]/news/[year]/[month]/[week]/page.tsx` component displays news for a specific week
   - News items are fetched from the database for the exact Monday-Sunday period

### Data Flow

1. **Date Calculation**:

   - The application determines the current week based on the most recent Sunday
   - Week boundaries (Monday-Sunday) are calculated for data fetching

2. **Data Fetching**:

   - `fetchNewsItemsForWeek()` in `app/actions/news.actions.ts` retrieves items within the calculated date range
   - Results are filtered by chain (Ethereum, etc.) and approved status

3. **Data Display**:
   - News items are grouped by category
   - The sidebar navigation shows years, months, and weeks with properly calculated date ranges

### Example Scenario

- Current date: Wednesday, August 21, 2023
- Most recent release day: Sunday, August 18, 2023
- Current week boundaries: Monday, August 15 to Sunday, August 21, 2023
- News displayed: All approved items from this Monday-Sunday period

## Development

### Prerequisites

- Node.js (v16+)
- Yarn or npm

### Setup

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build
```

## Project Structure

- `app/`: Next.js App Router components and pages
- `app/[chain]/`: Chain-specific pages
- `app/[chain]/news/[year]/[month]/[week]/`: Weekly news pages
- `app/components/`: Shared UI components
- `app/actions/`: Server actions for data fetching
- `app/utils/`: Utility functions
- `app/config/`: Application configuration
- `prisma/`: Database schema and client
