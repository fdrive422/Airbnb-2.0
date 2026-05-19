import React, { useState } from "react";

export default function DisclaimerBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className="relative bg-amber-50 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-700 px-4 py-2 text-center text-sm text-amber-800 dark:text-amber-200">
      <span>
        <strong>Demo project</strong> — built for educational purposes only.
        Not affiliated with, endorsed by, or connected to Airbnb, Inc.
      </span>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600 dark:text-amber-300 hover:text-amber-900 dark:hover:text-white font-bold text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}
