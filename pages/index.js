import Link from "next/link";

import { PageSeo } from "@/components/SEO";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import SocialIcon from "@/components/social-icons";

const MAX_DISPLAY = 3;
const postDateTemplate = { year: "numeric", month: "long", day: "numeric" };

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter("blog");

  return { props: { posts } };
}

export default function Home({ posts }) {
  return (
    <>
      <PageSeo
        title="Karuppusamy | Web Developer"
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
      />
      <div
        className="flex flex-col "
        style={{ height: "calc( 100vh - 78px )" }}
      >
        <div className="flex-grow flex flex-col justify-center">
          <div>
            <h1 className="mb-6 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight sm:leading-tight md:leading-tight">
              Hi,
              <br /> I'am <span className="text-blue-400">Karuppusamy</span>
              <br /> Web Developer
            </h1>
            <Link href="#contact">
              <button className="inline px-7 py-2 text-base font-semibold text-white transition-colors duration-300 bg-blue-400 rounded-lg shadow-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-400 focus:ring-opacity-70 dark:ring-offset-gray-900 dark:bg-blue-500 dark:hover:bg-blue-400">
                Contact
              </button>
            </Link>
          </div>
        </div>
        <div className="flex my-12 text-2xl space-x-5">
          <SocialIcon kind="gmail" href={`mailto:${siteMetadata.email}`} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} />
          {/* <SocialIcon kind="instagram" href={siteMetadata.instagram} /> */}
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
          {/* <SocialIcon kind="youtube" href={siteMetadata.youtube}/> */}
          <SocialIcon kind="github" href={siteMetadata.github} />
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-8 pb-6 space-y-2 md:space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-4xl">
            Recent Posts
          </h1>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && "No posts found."}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter;
            return (
              <li key={slug} className="py-8 xl:py-10">
                <article>
                  <div className="space-y-1 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-sm xl:text-base font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>
                          {new Date(date).toLocaleDateString(
                            siteMetadata.locale,
                            postDateTemplate
                          )}
                        </time>
                      </dd>
                    </dl>
                    <div className="space-y-1 xl:col-span-3">
                      <div className="space-y-2">
                        <div>
                          <h2 className="text-xl xl:text-2xl font-semibold tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        <Link href={`/blog/${slug}`}>
                          <a
                            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                            aria-label={`Read "${title}"`}
                          >
                            Read more &rarr;
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  );
}
