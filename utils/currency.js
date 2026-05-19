/**
 * Normalises any price string to USD display.
 * Handles: AUD/EUR/GBP/€/£ prefixes, "x 5 nights" → " 5 nights", numeric values.
 */
export function formatUSD(value) {
  if (value === null || value === undefined || value === "") return "";

  // Numeric — format directly as USD
  if (typeof value === "number") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }

  if (typeof value === "string") {
    return value
      // Replace currency codes with $
      .replace(/\b(AUD|EUR|GBP|CAD|NZD)\s*/gi, "$")
      // Replace unicode currency symbols
      .replace(/[€£¥]\s*/g, "$")
      // Replace " x " separator between numbers and text (e.g. "$150 x 5 nights")
      .replace(/\s+x\s+/gi, " ")
      // Collapse any double-spaces left behind
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  return String(value);
}
