/**
 * Normalises any price string/number to USD display.
 *
 * Handles these real API formats:
 *   "AUD 196.97"          → "$196.97"
 *   "$196.97AUD"          → "$196.97"
 *   "$196.97AUD 5 nights" → "$196.97 5 nights"
 *   "AUD 1,129 total"     → "$1,129 total"
 *   "€85 x 3 nights"      → "$85 3 nights"
 *   196.97  (number)       → "$197"
 */
export function formatUSD(value) {
  if (value === null || value === undefined || value === "") return "";

  if (typeof value === "number") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }

  if (typeof value === "string") {
    return (
      value
        // 1. Replace prefix currency codes (e.g. "AUD 196") with "$"
        .replace(/^(AUD|EUR|GBP|CAD|NZD)\s*/i, "$")
        // 2. Remove suffix currency codes (e.g. "$196.97AUD")
        .replace(/(AUD|EUR|GBP|CAD|NZD)/gi, "")
        // 3. Replace other currency symbols with $
        .replace(/[€£¥]\s*/g, "$")
        // 4. Replace " x " separator → space ("$85 x 3 nights" → "$85 3 nights")
        .replace(/\s+x\s+/gi, " ")
        // 5. Tidy up any double-spaces left behind
        .replace(/\s{2,}/g, " ")
        .trim()
    );
  }

  return String(value);
}
