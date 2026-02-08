/**
 * formatDate Utility
 * ------------------
 * Formats a date string into a human-readable
 * Indian locale date format.
 *
 * Example:
 *   "2026-02-08" → "08 Feb 2026"
 */

export const formatDate = (dateStr) => {
  // Return empty string if no date is provided
  if (!dateStr) return "";

  const d = new Date(dateStr);

  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
