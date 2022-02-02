const escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;",
};

type EscapeChar = keyof typeof escape;

/**
 * Escape a string for HTML links.
 * @param input string to escape
 * @returns string
 */
const htmlEscaper = (input: string): string =>
  input.replace(/[&<>'"]/g, (m) => escape[m as EscapeChar]);

export default htmlEscaper;
