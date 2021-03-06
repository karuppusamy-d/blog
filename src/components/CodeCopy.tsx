import { useState, useRef, ReactElement } from "react";

type Props = { children: ReactElement };

const Pre = ({ children }: Props): ReactElement => {
  const textInput = useRef<HTMLInputElement>(null);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const onEnter = (): void => {
    setHovered(true);
  };
  const onExit = (): void => {
    setHovered(false);
    setCopied(false);
  };
  const onCopy = (): void => {
    setCopied(true);
    if (textInput.current?.textContent)
      navigator.clipboard.writeText(textInput.current?.textContent);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      ref={textInput}
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
      className="relative"
    >
      <button
        aria-label="Copy code"
        type="button"
        tabIndex={-1}
        className={`absolute right-3 top-3 h-8 w-8 rounded border-2 bg-transparent p-1 ${
          copied
            ? "border-green-400 focus:border-green-400 focus:outline-none"
            : "border-gray-400 dark:border-gray-300"
        } ${hovered ? "opacity-100" : "opacity-0"} transition-all duration-300`}
        onClick={onCopy}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          className={`${
            copied ? "text-green-400" : "text-gray-400 dark:text-gray-300"
          }  transition-all duration-300`}
        >
          {copied ? (
            <>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </>
          ) : (
            <>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </>
          )}
        </svg>
      </button>

      <pre>{children}</pre>
    </div>
  );
};

export default Pre;
