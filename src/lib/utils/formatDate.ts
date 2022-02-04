import siteMetadata from "@/data/siteMetadata";

type FormatDate = (
  date: string,
  style?: "long" | "short" | "full" | "medium"
) => string;

/**
 * Formats a date string into specified format
 * @param date date to format as a string
 * @param style format style to use (defaults to "long")
 * @returns formatted date
 */
const formatDate: FormatDate = (date, style = "long") => {
  const now = new Date(date).toLocaleDateString(siteMetadata.locale, {
    dateStyle: style,
  });

  return now;
};

export default formatDate;
