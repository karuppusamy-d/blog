import { ReactElement } from "react";
import { GetStaticPaths, GetStaticProps as GetStaticPropsNext } from "next";
import { MDXLayoutRenderer } from "@/components/MDXLayoutRenderer";
import {
  getFiles,
  getFileBySlug,
  getAllFilesFrontMatter,
  formatSlug,
} from "@/lib/mdx";
import PostLayout from "@/layouts/PostLayout";
import PageTitle from "@/components/PageTitle";
import generateRss from "@/lib/generate-rss";
import { writeFileSync } from "fs";
import { FrontMatter, Post } from "@/lib/mdx/types";

type Props = { post: Post; prev: FrontMatter | null; next: FrontMatter | null };
type GetStaticProps = GetStaticPropsNext<Props, { slug: string[] }>;

const Blog = ({ post, prev, next }: Props): ReactElement => {
  const { mdxSource, frontMatter } = post;

  return (
    <>
      {frontMatter.draft !== true ? (
        <PostLayout frontMatter={frontMatter} prev={prev} next={next}>
          <MDXLayoutRenderer mdxSource={mdxSource} />
        </PostLayout>
      ) : (
        <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
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

export const getStaticPaths: GetStaticPaths = async () => {
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const allPosts = await getAllFilesFrontMatter("blog");
  const postIndex = allPosts.findIndex(
    (post) => formatSlug(post.slug) === slug.join("/")
  );
  const prev = allPosts[postIndex + 1] || null;
  const next = allPosts[postIndex - 1] || null;
  const post = await getFileBySlug("blog", slug.join("/"));

  // rss
  if (allPosts.length > 0) {
    const rss = generateRss(allPosts);
    writeFileSync("./public/feed.xml", rss);
  }

  return { props: { post, prev, next } };
};

export default Blog;
