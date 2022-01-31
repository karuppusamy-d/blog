import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import Image from "next/image";
import CustomLink from "./Link";
import CodeCopy from "./CodeCopy";

const MDXComponents = {
  Image,
  a: CustomLink,
  pre: CodeCopy,
};

const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />;
};

export { MDXComponents, MDXLayoutRenderer };
