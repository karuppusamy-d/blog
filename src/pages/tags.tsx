import { ReactElement } from "react";
import { GetStaticProps } from "next";
import siteMetadata from "@/data/siteMetadata";
import kebabCase from "@/lib/utils/kebabCase";
import { getAllTags } from "@/lib/tags";
import Tag from "@/components/Tag";
import Link from "@/components/Link";
import { PageSeo } from "@/components/SEO";
import { ObjectMap } from "@/lib/mdx/types";

type Props = { tags: ObjectMap<number> };

const Tags = ({ tags }: Props): ReactElement => {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
  return (
    <>
      <PageSeo
        title={`Tags | ${siteMetadata.author}`}
        description="Things I blog about"
        url={`${siteMetadata.siteUrl}/tags`}
      />
      <div className="flex min-h-[80vh] flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="pt-10 pb-5 md:p-0">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-6xl">
            Tags
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap pt-6 md:p-0">
          {Object.keys(tags).length === 0 && "No tags found."}
          {sortedTags.map((t) => {
            return (
              <div key={t} className="mt-2 mb-2 mr-5">
                <Tag text={t} />
                <Link
                  href={`/tags/${kebabCase(t)}`}
                  className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                >
                  {` (${tags[t]})`}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const tags = await getAllTags("blog");

  return { props: { tags } };
};

export default Tags;
