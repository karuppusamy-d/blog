import { ReactElement } from "react";
import { GetStaticPaths, GetStaticProps as GetStaticPropsNext } from "next";
import path from "path";
import kebabCase from "@/lib/utils/kebabCase";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { getAllTags } from "@/lib/tags";
import siteMetadata from "@/data/siteMetadata";
import ListLayout from "@/layouts/ListLayout";
import { PageSeo } from "@/components/SEO";
import generateRss from "@/lib/generate-rss";
import { mkdirSync, writeFileSync } from "fs";
import { FrontMatter } from "@/lib/mdx/types";

const root = process.cwd();

type Props = { posts: FrontMatter[]; tag: string };
type GetStaticProps = GetStaticPropsNext<Props, { tag: string }>;

const Tags = ({ posts, tag }: Props): ReactElement => {
  // Capitalize first letter and convert dash to space
  const title = tag[0].toUpperCase() + tag.split("-").join(" ").slice(1);
  return (
    <>
      <PageSeo
        title={`Tags - ${title} | ${siteMetadata.title}`}
        description={`Tags - ${title} - ${siteMetadata.title}`}
        url={`${siteMetadata.siteUrl}/tags/${tag}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getAllTags("blog");

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = params?.tag;

  if (!tag) {
    return {
      notFound: true,
    };
  }

  const allPosts = await getAllFilesFrontMatter("blog");
  const filteredPosts = allPosts.filter((post) =>
    post.tags.map((t) => kebabCase(t)).includes(tag)
  );

  // rss
  const rss = generateRss(filteredPosts, `tags/${tag}/index.xml`);
  const rssPath = path.join(root, "public", "tags", tag);
  mkdirSync(rssPath, { recursive: true });
  writeFileSync(path.join(rssPath, "index.xml"), rss);

  return { props: { posts: filteredPosts, tag: tag } };
};

export default Tags;
