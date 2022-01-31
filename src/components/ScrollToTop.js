import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 500) setShow(true);
      else setShow(false);
    };

    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      aria-label="Scroll To Top"
      type="button"
      onClick={handleScrollTop}
      className={`fixed gap-3 right-8 bottom-8 p-2 transition-all duration-300 rounded-full text-primary-400 bg-primary-100 hover:bg-primary-200 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default ScrollToTop;
