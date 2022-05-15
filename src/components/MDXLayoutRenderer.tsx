import { ReactElement, useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import Image from "next/image";
import Link from "@/components/Link";
import CodeCopy from "@/components/CodeCopy";
import { MDXComponents } from "mdx/types";

const components = {
  Image,
  a: Link,
  pre: CodeCopy,
} as MDXComponents;

type Props = { mdxSource: string };

const MDXLayoutRenderer = ({ mdxSource, ...rest }: Props): ReactElement => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout components={components} {...rest} />;
};

export { MDXLayoutRenderer };
