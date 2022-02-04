import Link from "@/components/Link";
import kebabCase from "@/lib/utils/kebabCase";
import { ReactElement } from "react";

type Props = { text: string };

const Tag = ({ text }: Props): ReactElement => {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className="mr-3 text-sm font-medium uppercase text-primary-400 hover:text-primary-500 dark:text-primary-500 dark:hover:text-primary-400"
    >
      {text.split(" ").join("-")}
    </Link>
  );
};

export default Tag;
