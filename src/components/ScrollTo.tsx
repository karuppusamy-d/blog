import { useEffect, useState } from "react";

const ScrollTo = () => {
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

  const handleScrollToComment = () => {
    document.getElementById("comment").scrollIntoView();
  };
  return (
    <div className={`fixed flex flex-col gap-3 right-8 bottom-8`}>
      <button
        aria-label="Scroll To Comment"
        type="button"
        tabIndex={-1}
        onClick={handleScrollToComment}
        className={`p-3 transition-all duration-300 rounded-full text-primary-300 bg-primary-100 hover:text-primary-400 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 shadow-md ${
          show ? "translate-y-0" : "translate-y-[3.75rem]"
        }`}
      >
        <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        aria-label="Scroll To Top"
        type="button"
        tabIndex={-1}
        onClick={handleScrollTop}
        className={`p-3 transition-all duration-300 rounded-full text-primary-300 bg-primary-100 hover:text-primary-400 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 shadow-md ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default ScrollTo;
