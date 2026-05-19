const EUR_TO_USD = 1.08;

// Strips any currency symbol, parses the number, converts EUR→USD, formats as $
export function formatUSD(value) {
  if (!value && value !== 0) return "";

  // If it's already a formatted string (e.g. "€120 / night" or "€850 total")
  if (typeof value === "string") {
    const suffix = value.replace(/[€£$\d,.\s]/g, "").trim(); // e.g. "/ night" or "total"
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(numeric)) return value;
    const usd = Math.round(numeric * EUR_TO_USD);
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(usd);
    return suffix ? `${formatted} ${suffix}` : formatted;
  }

  const usd = Math.round(Number(value) * EUR_TO_USD);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usd);
}
