import React from "react";

const FOOTER_LINKS = [
  {
    heading: "SUPPORT",
    links: ["Help Center", "AirCover", "Safety information", "Accessibility", "Contact Us"],
  },
  {
    heading: "COMMUNITY",
    links: ["Airbnb.org: disaster relief", "Support Afghan refugees", "Anti-discrimination", "Guest referrals"],
  },
  {
    heading: "HOSTING",
    links: ["Airbnb your home", "AirCover for Hosts", "Hosting resources", "Community forum", "Hosting responsibly"],
  },
  {
    heading: "AIRBNB",
    links: ["Newsroom", "New features", "Careers", "Investors", "Gift cards"],
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
      <div className="border-t border-gray-200 dark:border-gray-800 px-8 md:px-16 py-4 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-500">
        <p>© 2024 Airbnb Clone (Unofficial) · Privacy · Terms · Sitemap</p>
        <p className="mt-2 sm:mt-0">USD · English (US)</p>
      </div>
    </footer>
  );
}

export default Footer;
