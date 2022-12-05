import NextLink from "next/link";
import { ReactElement, ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = { href: string; children: ReactNode; [key: string]: any };

const Link = ({ href, children, ...rest }: Props): ReactElement => {
  const isInternalLink = href && href.startsWith("/");
  const isAnchorLink = href && href.startsWith("#");

  if (isInternalLink) {
    return (
      <NextLink href={href} {...rest}>
        {children}
      </NextLink>
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

export default Link;
