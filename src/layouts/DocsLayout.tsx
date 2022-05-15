import { ReactNode, ReactElement } from "react";
import Link from "@/components/Link";
import ScrollTo from "@/components/ScrollTo";
import { BlogSeo } from "@/components/SEO";
import SocialIcon from "@/components/social-icons";
import Comments from "@/components/comments";
import siteMetadata from "@/data/siteMetadata";
import { PostFrontMatter } from "@/lib/mdx/types";
import SideNav from "@/components/SideNav/SideNav";

type Props = {
  children: ReactNode;
  frontMatter: PostFrontMatter;
};
type DocsLayoutType = (props: Props) => ReactElement;

const pageUrl = (slug: string): string =>
  `${encodeURIComponent(`${siteMetadata.siteUrl}/docs/${slug}`)}`;

const DocsLayout: DocsLayoutType = ({ children, frontMatter }) => {
  const { slug, fileName } = frontMatter;

  return (
    <>
      <BlogSeo
        url={`${siteMetadata.siteUrl}/docs/${frontMatter.slug}`}
        {...frontMatter}
      />

      <div
        className="grid grid-flow-col xl:gap-x-8"
        style={{ gridTemplateColumns: "auto 1fr" }}
      >
        {/* Sidenav */}
        <SideNav />

        {/* Main */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
          <div className="prose max-w-none pt-12 pb-6 dark:prose-dark">
            {children}
          </div>

          {/* Show social Icons */}
          <div className="flex-column flex space-x-3 py-6 text-sm text-gray-700 dark:text-gray-300 sm:text-base">
            <div className="flex-column flex items-center space-x-3 text-base sm:text-[1.2rem]">
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
                href={`https://twitter.com/intent/tweet?url=${pageUrl(slug)}`}
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
              href={`${siteMetadata.siteRepo}/blob/main/data/docs/${fileName}`}
            >
              View on GitHub
            </Link>
          </div>

          {/* Show comments */}
          <Comments mapping={frontMatter.slug} />
        </div>
      </div>

      <ScrollTo />
    </>
  );
};

export default DocsLayout;
