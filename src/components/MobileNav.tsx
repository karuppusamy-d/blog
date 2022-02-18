import { ReactElement, useState } from "react";
import Link from "@/components/Link";
import headerNavLinks from "@/data/headerNavLinks";

const MobileNav = (): ReactElement => {
  const [navShow, setNavShow] = useState(false);

  const onToggleNav = (): void => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        // Prevent scrolling
        document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };

  return (
    <div className="sm:hidden">
      <button
        type="button"
        className="ml-1 mr-1 flex h-8 w-8 rounded focus:outline-none focus:ring-gray-800 focus-visible:ring-2 dark:focus:ring-gray-200"
        onClick={onToggleNav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Toggle Menu"
          viewBox="0 0 20 20"
          height="100%"
          fill="currentColor"
        >
          {navShow ? (
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          )}
        </svg>
      </button>

      <div
        className={`fixed top-16 right-0 z-10 h-full w-9/12 bg-gray-200 duration-500 ease-in-out dark:bg-gray-800 ${
          navShow ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="fixed mt-4 h-full">
          {headerNavLinks.map((link) => (
            <div key={link.title} className="px-8 py-4">
              <Link
                href={link.href}
                className="text-base font-semibold tracking-wider"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="toggle navmenu"
        className={`fixed inset-x-0 top-16 h-full w-full cursor-auto backdrop-blur-sm focus:outline-none ${
          navShow ? "block" : "hidden"
        }`}
        onClick={onToggleNav}
      ></button>
    </div>
  );
};

export default MobileNav;
