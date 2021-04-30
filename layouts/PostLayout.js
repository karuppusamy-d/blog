import Link from "@/components/Link";
import PageTitle from "@/components/PageTitle";
import { BlogSeo } from "@/components/SEO";
import SocialIcon from "@/components/social-icons";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";

const editUrl = (fileName) =>
  `${siteMetadata.siteRepo}/blob/main/data/blog/${fileName}`;
const PageUrl = (slug) =>
  `${encodeURIComponent(`${siteMetadata.siteUrl}/blog/${slug}`)}`;

const postDateTemplate = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function PostLayout({ children, frontMatter, next, prev }) {
  const { slug, fileName, date, title, tags } = frontMatter;

  return (
    <>
      <BlogSeo
        url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`}
        {...frontMatter}
      />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-8 xl:pb-10 xl:pt-12">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-8 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(
                        siteMetadata.locale,
                        postDateTemplate
                      )}
                    </time>
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
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex justify-center space-x-8 xl:block sm:space-x-12 xl:space-x-0 xl:space-y-8">
                  <li className="flex items-center space-x-2">
                    <img
                      src={siteMetadata.image}
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
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
              <div className="flex flex-column py-6 space-x-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex flex-column text-base items-center space-x-3">
                  <SocialIcon
                    kind="whatsapp"
                    href={`whatsapp://send?text=${PageUrl(slug)}`}
                  />
                  <SocialIcon
                    kind="facebook"
                    href={`https://www.facebook.com/share.php?display=page&u=${PageUrl(
                      slug
                    )}`}
                  />
                  <SocialIcon
                    kind="twitter"
                    href={`https://twitter.com/intent/tweet?url=${PageUrl(
                      slug
                    )}`}
                  />
                  <SocialIcon
                    kind="linkedin"
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${PageUrl(
                      slug
                    )}`}
                  />
                </div>
                <div> • </div>
                <Link href={editUrl(fileName)}>{"View on GitHub"}</Link>
              </div>
            </div>

            <div className="text-sm font-medium divide-gray-200 xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
              {tags && (
                <div className="pt-8 pb-4 xl:py-8">
                  <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
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
                      <div className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                        <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                      </div>
                    </div>
                  )}
                  {next && (
                    <div>
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        Next Article
                      </h2>
                      <div className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
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
    </>
  );
}
