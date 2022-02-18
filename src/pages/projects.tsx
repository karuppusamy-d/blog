import { ReactElement } from "react";
import siteMetadata from "@/data/siteMetadata";
import projectsData from "@/data/projectsData";
import Card from "@/components/Card";
import { PageSeo } from "@/components/SEO";

const Projects = (): ReactElement => {
  return (
    <>
      <PageSeo
        title={`Projects | ${siteMetadata.author}`}
        description={siteMetadata.projectsDescription}
        url={`${siteMetadata.siteUrl}/projects`}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-10 pb-4 xl:space-y-3 xl:pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 xl:text-5xl">
            Projects
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 xl:text-base">
            My awesome inventions
          </p>
        </div>
        <div className="container py-10">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
