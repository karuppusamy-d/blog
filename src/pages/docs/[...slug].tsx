import { ReactElement } from "react";
import { GetStaticPaths, GetStaticProps as GetStaticPropsNext } from "next";
import { MDXLayoutRenderer } from "@/components/MDXLayoutRenderer";
import { getFileBySlug } from "@/lib/mdx";
import DocsLayout from "@/layouts/DocsLayout";
import { Post } from "@/lib/mdx/types";
import getPathsRecursively from "@/lib/utils/getPathsRecursively";
import routes from "@/data/docs/routes.json";

type Props = { page: Post };
type GetStaticProps = GetStaticPropsNext<Props, { slug: string[] }>;

const Docs = ({ page }: Props): ReactElement => {
  const { mdxSource, frontMatter } = page;

  return (
    <DocsLayout frontMatter={frontMatter}>
      <MDXLayoutRenderer mdxSource={mdxSource} />
    </DocsLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = getPathsRecursively(routes);

  return {
    paths: pages.map((p) => ({
      params: {
        slug: p.split("/"),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const page = await getFileBySlug("docs", slug.join("/"));

  return { props: { page } };
};

export default Docs;
