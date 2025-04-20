/**
 * Format date for query - calculates start and end dates for a given week
 */
export function getDateRangeForWeek(year: number, month: number, week: number) {
  // Calculate the first day of the month
  const firstDay = new Date(year, month - 1, 1);

  // Calculate the first day of the week within that month
  // For simplicity, we'll say week 1 starts on the 1st, week 2 on the 8th, etc.
  const startDay = new Date(year, month - 1, (week - 1) * 7 + 1);

  // End day is 6 days after start (7 days total)
  const endDay = new Date(startDay);
  endDay.setDate(startDay.getDate() + 6);

  return { startDay, endDay };
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
