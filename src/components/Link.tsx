import Link from "next/link";
import { ReactElement, ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = { href: string; children: ReactNode; [key: string]: any };

const CustomLink = ({ href, children, ...rest }: Props): ReactElement => {
  const isInternalLink = href && href.startsWith("/");
  const isAnchorLink = href && href.startsWith("#");

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...rest}>{children}</a>
      </Link>
    );
  }

  if (isAnchorLink) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
      {children}
    </a>
  );
};

export default CustomLink;
