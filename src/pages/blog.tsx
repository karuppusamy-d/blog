import { getAllFilesFrontMatter } from "@/lib/mdx";
import siteMetadata from "@/data/siteMetadata";
import ListLayout from "@/layouts/ListLayout";
import { PageSeo } from "@/components/SEO";

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("blog");

  return { props: { posts } };
}

const Blog = ({ posts }) => {
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

export default Blog;
