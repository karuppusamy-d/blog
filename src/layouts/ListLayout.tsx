import Link from "@/components/Link";
import Tag from "@/components/Tag";
import { ReactElement, useState } from "react";
import formatDate from "@/lib/utils/formatDate";
import { FrontMatter } from "@/lib/mdx/types";

type Props = {
  posts: FrontMatter[];
  title: string;
};

const ListLayout = ({ posts, title }: Props): ReactElement => {
  const [searchValue, setSearchValue] = useState("");
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent =
      frontMatter.title + frontMatter.summary + frontMatter.tags.join(" ");
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <>
      <div className="min-h-[80vh] divide-y divide-gray-200 dark:divide-gray-800">
        <div className="space-y-3 pt-10 pb-5 xl:space-y-4 xl:pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 xl:text-5xl">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 outline-none ring-1 ring-transparent placeholder:text-sm focus:ring-gray-300 dark:border-gray-900 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-gray-900 dark:focus:ring-gray-800"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500"
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
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {!filteredBlogPosts.length && "No posts found."}
          {filteredBlogPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter;
            return (
              <li key={slug} className="py-8 xl:py-10">
                <article className="space-y-1 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-sm font-medium text-gray-500 dark:text-gray-400 xl:text-base">
                      <time dateTime={date}>{formatDate(date)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-1 xl:col-span-3">
                    <div className="space-y-2">
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
};

export default ListLayout;
