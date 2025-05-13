import { newsConfig } from "../config/news-config";

/**
 * Format date for query - calculates start and end dates for a given week based on config
 */
export function getDateRangeForWeek(year: number, month: number, week: number) {
  // JavaScript months are 0-indexed, adjust if we're getting 1-indexed month
  const jsMonth = month > 0 && month <= 12 ? month - 1 : month;

  // Calculate the first day of the month
  const firstDay = new Date(year, jsMonth, 1);

  // Find the first day that matches our weekStartDay
  const dayOfWeek = firstDay.getDay();
  const daysToAdd = (7 + newsConfig.weekStartDay - dayOfWeek) % 7;

  // Calculate the first weekStartDay of the month (e.g., first Monday)
  const firstWeekStartDay = new Date(year, jsMonth, 1 + daysToAdd);

  // For the special case of the first week, if first day of the month is after weekStartDay
  if (week === 1 && daysToAdd > 0) {
    // The first week starts before the first weekStartDay
    const startDay = new Date(year, jsMonth, 1);
    const endDay = new Date(firstWeekStartDay);
    endDay.setDate(endDay.getDate() - 1);
    return { startDay, endDay };
  }

  // Calculate the start date for the requested week
  // Adjust week number to account for potential partial first week
  const adjustedWeek = daysToAdd > 0 ? week - 1 : week;
  const startDay = new Date(firstWeekStartDay);
  startDay.setDate(firstWeekStartDay.getDate() + adjustedWeek * 7);

  // End day is the Sunday following the start date
  const endDay = new Date(startDay);
  const daysUntilEnd = (7 + newsConfig.weekEndDay - startDay.getDay()) % 7;
  // If daysUntilEnd is 0, it means we are already on the end day
  endDay.setDate(startDay.getDate() + (daysUntilEnd === 0 ? 0 : daysUntilEnd));

  return { startDay, endDay };
}

/**
 * Get the current week number for a given date within a month
 * based on our configured week boundaries
 */
export function getWeekNumberInMonth(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth(); // JavaScript 0-indexed month

  // Find the first day that matches our weekStartDay in this month
  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysToAdd = (7 + newsConfig.weekStartDay - firstDayOfWeek) % 7;

  // First day that matches our weekStartDay (e.g., Monday)
  const firstWeekStartDay = new Date(year, month, 1 + daysToAdd);

  // If the date is before the first weekStartDay of this month
  // and the month doesn't start on a weekStartDay, it's in week 1
  if (date < firstWeekStartDay && daysToAdd > 0) {
    return 1;
  }

  // Calculate weeks since the first weekStartDay
  const daysDifference = Math.floor(
    (date.getTime() - firstWeekStartDay.getTime()) / (1000 * 60 * 60 * 24)
  );
  // If we're in the first partial week, return 1
  if (daysDifference < 0) return 1;

  // Otherwise, calculate how many full weeks have passed and add 2
  // (add 2 because: +1 to be 1-indexed, +1 to account for the first partial week)
  return Math.floor(daysDifference / 7) + 2;
}

/**
 * Finds the most recent release day (e.g., Sunday) on or before the given date
 */
export function getMostRecentReleaseDay(date = new Date()): Date {
  const result = new Date(date);
  const currentDay = result.getDay();

  // Calculate days to go back to reach the release day
  const daysFromReleaseDay = (currentDay - newsConfig.releaseDay + 7) % 7;

  // Adjust the date to the most recent release day
  result.setDate(result.getDate() - daysFromReleaseDay);

  // Set to end of day
  result.setHours(23, 59, 59, 999);

  return result;
}

/**
 * Finds the start of the week containing the given date
 * based on our configured week start day
 */
export function getStartOfWeek(date = new Date()): Date {
  const result = new Date(date);
  const currentDay = result.getDay();

  // Calculate days to go back to reach the start of week
  const daysFromStartDay = (currentDay - newsConfig.weekStartDay + 7) % 7;

  // Adjust the date to the start of the week
  result.setDate(result.getDate() - daysFromStartDay);

  // Set to start of day
  result.setHours(0, 0, 0, 0);

  return result;
}

/**
 * Finds the end of the week containing the given date
 * based on our configured week end day
 */
export function getEndOfWeek(date = new Date()): Date {
  const startOfWeek = getStartOfWeek(date);
  const result = new Date(startOfWeek);

  // Add 6 days to get to the end of the week
  result.setDate(startOfWeek.getDate() + 6);

  // Set to end of day
  result.setHours(23, 59, 59, 999);

  return result;
}

/**
 * Format a date range for display (e.g., "January 1 - January 7, 2023")
 */
export function formatDateRange(startDay: Date, endDay: Date): string {
  const formattedStartDate = startDay.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  const formattedEndDate = endDay.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return `${formattedStartDate} - ${formattedEndDate}`;
}
