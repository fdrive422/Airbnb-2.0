import React from "react";

const FOOTER_LINKS = [
  {
    heading: "SUPPORT",
    links: ["Help Center", "Safety information", "Accessibility", "Contact Us", "FAQs"],
  },
  {
    heading: "COMMUNITY",
    links: ["Disaster relief", "Anti-discrimination", "Guest referrals", "Forum"],
  },
  {
    heading: "HOSTING",
    links: ["List your home", "Host resources", "Community forum", "Responsible hosting"],
  },
  {
    heading: "STAYFINDER",
    links: ["About", "Newsroom", "New features", "Careers", "Gift cards"],
  },
];

function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-8 md:px-16 py-12 text-gray-600 dark:text-gray-400">
        {FOOTER_LINKS.map(({ heading, links }) => (
          <div key={heading} className="space-y-3">
            <h5 className="text-xs font-bold text-gray-800 dark:text-gray-200 tracking-wider">
              {heading}
            </h5>
            {links.map((link) => (
              <p
                key={link}
                className="text-xs cursor-pointer hover:text-rose-400 dark:hover:text-rose-400 transition-colors"
              >
                {link}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800 px-8 md:px-16 py-4 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-500 gap-2">
        <p>© 2024 StayFinder · Privacy · Terms · Sitemap</p>
        <p className="text-amber-600 dark:text-amber-400 font-medium">
          Demo project — not affiliated with Airbnb, Inc.
        </p>
        <p>USD · English (US)</p>
      </div>
    </footer>
  );
}

export default Footer;
