import siteMetadata from "@/data/siteMetadata";

/**
 * Formats a date string in the format of "MMMM DD, YYYY"
 * @param date date to format as a string
 * @returns formatted date
 */
const formatDate = (date: string): string => {
  const now = new Date(date).toLocaleDateString(siteMetadata.locale, {
    dateStyle: "long",
  });

  return now;
};

export default formatDate;
