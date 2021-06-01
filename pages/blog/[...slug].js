import fs from "fs";
import hydrate from "next-mdx-remote/hydrate";
import {
  getFiles,
  getFileBySlug,
  getAllFilesFrontMatter,
  formatSlug,
} from "@/lib/mdx";
import PostLayout from "@/layouts/PostLayout";
import MDXComponents from "@/components/MDXComponents";
import PageTitle from "@/components/PageTitle";
import generateRss from "@/lib/generate-rss";

export async function getStaticPaths() {
  const posts = getFiles("blog");

  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split("/"),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter("blog");
  const postIndex = allPosts.findIndex(
    (post) => formatSlug(post.slug) === params.slug.join("/")
  );
  const prev = allPosts[postIndex + 1] || null;
  const next = allPosts[postIndex - 1] || null;
  const post = await getFileBySlug("blog", params.slug);

  // rss
  const rss = generateRss(allPosts);
  fs.writeFileSync("./public/index.xml", rss);

  return { props: { post, prev, next } };
}

export default function Blog({ post, prev, next }) {
  const { mdxSource, frontMatter } = post;
  const content = hydrate(mdxSource, {
    components: MDXComponents,
  });

  return (
    <>
      {frontMatter.draft !== true ? (
        <PostLayout frontMatter={frontMatter} prev={prev} next={next}>
          {content}
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
}
