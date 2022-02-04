import { getAllFilesFrontMatter } from "@/lib/mdx";
import siteMetadata from "@/data/siteMetadata";
import ListLayout from "@/layouts/ListLayout";
import { PageSeo } from "@/components/SEO";
import { NextPage, GetStaticProps } from "next";
import { FrontMatter } from "@/lib/mdx/types";

type Props = { posts: FrontMatter[] };

const Blog: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <PageSeo
        title={`Blog | ${siteMetadata.author}`}
        description={siteMetadata.blogDescription}
        url={`${siteMetadata.siteUrl}/blog`}
      />
      <ListLayout posts={posts} title="All Posts" />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getAllFilesFrontMatter("blog");

  return { props: { posts } };
};

export default Blog;
