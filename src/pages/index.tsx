import { ReactElement } from "react";
import { GetStaticProps } from "next";
import { PageSeo } from "@/components/SEO";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import SocialIcon from "@/components/SocialIcons";
import formatDate from "@/lib/utils/formatDate";
import Link from "@/components/Link";
import { FrontMatter } from "@/lib/mdx/types";

const MAX_DISPLAY = 3;

type Props = { posts: FrontMatter[] };

const Home = ({ posts }: Props): ReactElement => {
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
        <div className="flex grow flex-col justify-center">
          <div>
            <h1 className="mb-4 text-3xl font-bold leading-snug sm:mb-6 sm:text-[2.75rem] sm:leading-snug md:text-[3.5rem] md:leading-snug">
              Hi,
              <br /> I&apos;am{" "}
              <span className="text-primary-400">Karuppusamy</span>
              <br /> Developer
            </h1>
            <a
              href={siteMetadata.resume}
              className="btn text-[0.85rem] sm:text-base"
              aria-label="View Resume"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </a>
          </div>
        </div>
        <div className="my-12 flex space-x-5 text-2xl">
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
        <div className="space-y-2 pt-8 pb-6 md:space-y-3">
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
                  <div className="space-y-1 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-sm font-medium text-gray-500 dark:text-gray-400 xl:text-base">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-1 xl:col-span-3">
                      <div className="space-y-2">
                        <div>
                          <h2 className="text-xl font-semibold tracking-tight xl:text-2xl">
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
                        <div className="max-w-none leading-relaxed tracking-wide text-gray-600 dark:text-gray-300">
                          {summary}
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        <Link
                          className="text-primary-400 hover:text-primary-500 dark:text-primary-500 dark:hover:text-primary-400"
                          href={`/blog/${slug}`}
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
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
        <div className="flex justify-end font-medium">
          <Link
            href="/blog"
            className="text-primary-400 hover:text-primary-500 dark:text-primary-500 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getAllFilesFrontMatter("blog");

  return { props: { posts } };
};

export default Home;
