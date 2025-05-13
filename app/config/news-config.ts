// Get values from environment variables or use defaults
const releaseDay = +process.env.NEWS_RELEASE_DAY! || 0; // Default: Sunday
const weekStartDay = +process.env.NEWS_WEEK_START_DAY! || 1; // Default: Monday
const weekEndDay = +process.env.NEWS_WEEK_END_DAY! || 0; // Default: Sunday

const getDayName = (dayNum: number): string => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[dayNum] || "Unknown";
};

export const newsConfig = {
  // Day of week for news release (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  releaseDay, // Default: Sunday

  // First day of week for weekly news aggregation
  weekStartDay, // Default: Monday

  // Last day of week for weekly news aggregation
  weekEndDay, // Default: Sunday

  // String representations (for logging/UI)
  releaseDayName: getDayName(releaseDay),
  weekStartDayName: getDayName(weekStartDay),
  weekEndDayName: getDayName(weekEndDay),
};
