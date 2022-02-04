import { ReactNode, ReactElement } from "react";
import Image from "next/image";
import Link from "@/components/Link";
import PageTitle from "@/components/PageTitle";
import ScrollTo from "@/components/ScrollTo";
import { BlogSeo } from "@/components/SEO";
import SocialIcon from "@/components/social-icons";
import Tag from "@/components/Tag";
import Comments from "@/components/comments";
import siteMetadata from "@/data/siteMetadata";
import formatDate from "@/lib/utils/formatDate";
import { FrontMatter, PostFrontMatter } from "@/lib/mdx/types";

type Props = {
  children: ReactNode;
  frontMatter: PostFrontMatter;
  prev: FrontMatter | null;
  next: FrontMatter | null;
};
type PostLayoutType = (props: Props) => ReactElement;

const pageUrl = (slug: string): string =>
  `${encodeURIComponent(`${siteMetadata.siteUrl}/blog/${slug}`)}`;

const PostLayout: PostLayoutType = ({ children, frontMatter, next, prev }) => {
  const { slug, fileName, date, title, tags } = frontMatter;

  return (
    <>
      <BlogSeo
        url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`}
        {...frontMatter}
      />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-8 xl:pb-9 xl:pt-12">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-8 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date, "full")}</time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>

          <div
            className="divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6"
            style={{ gridTemplateRows: "auto 1fr" }}
          >
            <dl className="pt-6 pb-8 xl:py-8 xl:border-b xl:border-gray-200 xl:dark:border-gray-700">
              <dt className="sr-only">Author</dt>
              <dd>
                <ul className="flex justify-center space-x-8 xl:block sm:space-x-12 xl:space-x-0 xl:space-y-8">
                  <li className="flex items-center space-x-2">
                    <Image
                      src={siteMetadata.image}
                      alt="avatar"
                      width={"40px"}
                      height={"40px"}
                      className="rounded-full"
                    />
                    <dl className="text-sm font-semibold whitespace-nowrap">
                      <dt className="sr-only">Name</dt>
                      <dd className="text-gray-800 dark:text-gray-300">
                        {siteMetadata.author}
                      </dd>
                      <dt className="sr-only">Headline</dt>
                      <dd className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {siteMetadata.headline}
                      </dd>
                    </dl>
                  </li>
                </ul>
              </dd>
            </dl>

            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
              <div className="pt-8 pb-6 prose dark:prose-dark max-w-none">
                {children}
              </div>

              {/* Show social Icons */}
              <div className="flex flex-column py-6 space-x-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                <div className="flex flex-column text-base sm:text-[1.2rem] items-center space-x-3">
                  <SocialIcon
                    kind="whatsapp"
                    href={`whatsapp://send?text=${pageUrl(slug)}`}
                  />
                  <SocialIcon
                    kind="facebook"
                    href={`https://www.facebook.com/share.php?display=page&u=${pageUrl(
                      slug
                    )}`}
                  />
                  <SocialIcon
                    kind="twitter"
                    href={`https://twitter.com/intent/tweet?url=${pageUrl(
                      slug
                    )}`}
                  />
                  <SocialIcon
                    kind="linkedin"
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl(
                      slug
                    )}`}
                  />
                </div>
                <div> • </div>
                <Link
                  href={`${siteMetadata.siteRepo}/blob/main/data/blog/${fileName}`}
                >
                  View on GitHub
                </Link>
              </div>

              {/* Show comments */}
              <Comments mapping={frontMatter.slug} />
            </div>

            <div className="text-sm font-medium divide-gray-200 xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
              {tags && (
                <div className="pt-8 pb-4 xl:py-8">
                  <h2 className="text-sm tracking-wide text-gray-500 uppercase dark:text-gray-400">
                    Tags
                  </h2>
                  <div className="flex flex-wrap">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>
              )}
              {(next || prev) && (
                <div className="flex justify-between pt-4 pb-2 xl:block xl:space-y-8 xl:py-8">
                  {prev && (
                    <div>
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        Previous Article
                      </h2>
                      <div className="text-primary-400 hover:text-primary-500 dark:text-primary-500 dark:hover:text-primary-400">
                        <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                      </div>
                    </div>
                  )}
                  {next && (
                    <div>
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        Next Article
                      </h2>
                      <div className="text-primary-400 hover:text-primary-500 dark:text-primary-500 dark:hover:text-primary-400">
                        <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
      <ScrollTo />
    </>
  );
};

export default PostLayout;
