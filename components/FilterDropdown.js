import { useEffect, useRef } from "react";

function FilterDropdown({ onClose, children }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 mt-2 z-50 bg-white dark:bg-gray-800
                 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700
                 p-5 min-w-[240px]"
    >
      {children}
    </div>
  );
}

export default FilterDropdown;
