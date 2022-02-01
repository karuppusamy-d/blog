import fs from "fs";
import { MDXLayoutRenderer } from "@/components/MDXComponents";
import {
  getFiles,
  getFileBySlug,
  getAllFilesFrontMatter,
  formatSlug,
} from "@/lib/mdx";
import PostLayout from "@/layouts/PostLayout";
import PageTitle from "@/components/PageTitle";
import generateRss from "@/lib/generate-rss";

const Blog = ({ post, prev, next }) => {
  const { mdxSource, frontMatter } = post;

  return (
    <>
      {frontMatter.draft !== true ? (
        <PostLayout frontMatter={frontMatter} prev={prev} next={next}>
          <MDXLayoutRenderer mdxSource={mdxSource} />
        </PostLayout>
      ) : (
        <div className="text-center flex flex-col items-center justify-center min-h-[80vh]">
          <PageTitle>
            Under Construction{" "}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  );
};

const getStaticPaths = async () => {
  const posts = getFiles("blog");

  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split("/"),
      },
    })),
    fallback: false,
  };
};

const getStaticProps = async ({ params }) => {
  const allPosts = await getAllFilesFrontMatter("blog");
  const postIndex = allPosts.findIndex(
    (post) => formatSlug(post.slug) === params.slug.join("/")
  );
  const prev = allPosts[postIndex + 1] || null;
  const next = allPosts[postIndex - 1] || null;
  const post = await getFileBySlug("blog", params.slug.join("/"));

  // rss
  if (allPosts.length > 0) {
    const rss = generateRss(allPosts);
    fs.writeFileSync("./public/feed.xml", rss);
  }

  return { props: { post, prev, next } };
};

export { getStaticPaths, getStaticProps };
export default Blog;