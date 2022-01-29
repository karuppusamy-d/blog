import Link from "@/components/Link";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";
import { useState } from "react";

const postDateTemplate = { year: "numeric", month: "long", day: "numeric" };

export default function ListLayout({ posts, title }) {
  const [searchValue, setSearchValue] = useState("");
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent =
      frontMatter.title + frontMatter.summary + frontMatter.tags.join(" ");
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700 min-h-[80vh]">
        <div className="pt-10 pb-5 space-y-3 xl:space-y-4 xl:pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 xl:text-5xl">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full px-4 py-2 rounded-md text-gray-900 border border-gray-300 dark:border-gray-900 outline-none ring-1 ring-transparent focus:ring-gray-300 focus:border-gray-300 dark:focus:ring-gray-700 dark:focus:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500"
            />
            <svg
              className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!filteredBlogPosts.length && "No posts found."}
          {filteredBlogPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter;
            return (
              <li key={slug} className="py-8 xl:py-10">
                <article className="space-y-1 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
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
                    <div className="tracking-wide leading-relaxed text-gray-600 max-w-none dark:text-gray-300">
                      {summary}
                    </div>
                    <div className="text-sm font-medium">
                      <Link
                        href={`/blog/${slug}`}
                        className="text-primary-400 hover:text-primary-500 dark:text-primary-500 dark:hover:text-primary-400"
                        aria-label={`Read "${title}"`}
                      >
                        Read more &rarr;
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
