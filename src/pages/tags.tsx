import siteMetadata from "@/data/siteMetadata";
import kebabCase from "@/lib/utils/kebabCase";
import { getAllTags } from "@/lib/tags";
import Tag from "@/components/Tag";
import Link from "@/components/Link";
import { PageSeo } from "@/components/SEO";

export async function getStaticProps() {
  const tags = await getAllTags("blog");

  return { props: { tags } };
}

const Tags = ({ tags }) => {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
  return (
    <>
      <PageSeo
        title={`Tags | ${siteMetadata.author}`}
        description="Things I blog about"
        url={`${siteMetadata.siteUrl}/tags`}
      />
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:justify-center md:items-center md:divide-y-0 md:flex-row md:space-x-6 min-h-[80vh]">
        <div className="pt-10 pb-5 md:p-0">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-6xl md:border-r-2 md:px-6">
            Tags
          </h1>
        </div>
        <div className="flex flex-wrap max-w-lg pt-6 md:p-0">
          {Object.keys(tags).length === 0 && "No tags found."}
          {sortedTags.map((t) => {
            return (
              <div key={t} className="mt-2 mb-2 mr-5">
                <Tag text={t} />
                <Link
                  href={`/tags/${kebabCase(t)}`}
                  className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
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

export default Tags;
