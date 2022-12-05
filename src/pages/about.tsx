import { ReactElement } from "react";
import siteMetadata from "@/data/siteMetadata";
import SocialIcon from "@/components/SocialIcons";
import { PageSeo } from "@/components/SEO";
import Image from "next/image";

const About = (): ReactElement => {
  return (
    <>
      <PageSeo
        title={`About | ${siteMetadata.author}`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/about`}
      />
      <div className="min-h-[80vh] divide-y divide-gray-200 dark:divide-gray-800">
        <div className="pt-10 pb-5 xl:pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 xl:text-5xl">
            About
          </h1>
        </div>
        <div className="items-center space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8 xl:py-12">
            <div className="h-32 w-32 xl:h-48 xl:w-48">
              <Image
                src={siteMetadata.image}
                alt="avatar"
                width={192}
                height={192}
                layout="responsive"
                className="rounded-full"
              />
            </div>
            <h3 className="pt-4 pb-1 text-xl font-semibold tracking-tight xl:text-2xl">
              {siteMetadata.author}
            </h3>
            <div className="text-gray-500 dark:text-gray-400">
              {siteMetadata.headline}
            </div>
            {/* <div className="text-gray-500 dark:text-gray-400">
              Stanford University
            </div> */}
            <div className="flex space-x-2 pt-4 text-xl text-gray-700 dark:text-gray-300 xl:space-x-3 xl:pt-6 xl:text-2xl">
              <SocialIcon kind="gmail" href={`mailto:${siteMetadata.email}`} />
              <SocialIcon kind="facebook" href={siteMetadata.facebook} />
              <SocialIcon kind="twitter" href={siteMetadata.twitter} />
              <SocialIcon kind="instagram" href={siteMetadata.instagram} />
              <SocialIcon kind="youtube" href={siteMetadata.youtube} />
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
              <SocialIcon kind="github" href={siteMetadata.github} />
            </div>
          </div>
          <div className="prose max-w-none pt-6 leading-relaxed dark:prose-dark xl:col-span-2 xl:pb-6">
            <p>
              I am Karuppusamy, a self-learned programmer. I currently live in
              India with my family. A hard-working and ambitious person who
              isn’t afraid to face a challenge.
            </p>
            <p>
              I do passionate about programming. Because I love what I do, I
              have a steady source of motivation that drives me to do my best.
            </p>
            <p>
              I love learning different skills and creating awesome projects
              based on my knowledge. I am currently learning Linux and Cloud
              Computing.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
