import Image from "next/image";
import siteMetadata from "@/data/siteMetadata";
import projectsData from "@/data/projectsData";
import Link from "@/components/Link";
import Card from "@/components/Card";
import { PageSeo } from "@/components/SEO";

export default function Projects() {
  return (
    <>
      <PageSeo
        title={`Projects | ${siteMetadata.author}`}
        description={siteMetadata.projectsDescription}
        url={`${siteMetadata.siteUrl}/projects`}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-10 pb-4 space-y-2 xl:space-y-3 xl:pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 xl:text-5xl">
            Projects
          </h1>
          <p className="text-sm xl:text-base text-gray-500 dark:text-gray-400">
            My Awesome Creations
          </p>
        </div>
        <div className="container py-10">
          <div className="flex flex-wrap -m-4">
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
}
