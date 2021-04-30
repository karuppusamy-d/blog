import siteMetadata from "@/data/siteMetadata";
import SocialIcon from "@/components/social-icons";
import { PageSeo } from "@/components/SEO";

export default function About() {
  return (
    <>
      <PageSeo
        title={`About | ${siteMetadata.author}`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/about`}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700 min-h-[80vh]">
        <div className="pt-10 pb-5 xl:pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 xl:text-5xl">
            About
          </h1>
        </div>
        <div className="items-center space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8 space-x-2 xl:py-12">
            <img
              src={siteMetadata.image}
              alt="avatar"
              className="w-32 xl:w-48 h-32 xl:h-48 rounded-full"
            />
            <h3 className="pt-4 pb-1 text-xl xl:text-2xl font-semibold tracking-tight">
              {siteMetadata.author}
            </h3>
            <div className="text-gray-500 dark:text-gray-400">
              {siteMetadata.headline}
            </div>
            {/* <div className="text-gray-500 dark:text-gray-400">
              Stanford University
            </div> */}
            <div className="flex pt-4 xl:pt-6 space-x-2 xl:space-x-3 text-xl xl:text-2xl text-gray-700 dark:text-gray-300">
              <SocialIcon kind="gmail" href={`mailto:${siteMetadata.email}`} />
              <SocialIcon kind="facebook" href={siteMetadata.facebook} />
              <SocialIcon kind="twitter" href={siteMetadata.twitter} />
              <SocialIcon kind="instagram" href={siteMetadata.instagram} />
              <SocialIcon kind="youtube" href={siteMetadata.youtube} />
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
              <SocialIcon kind="github" href={siteMetadata.github} />
            </div>
          </div>
          <div className="pt-6 prose dark:prose-dark max-w-none xl:pb-6 xl:col-span-2">
            <p>
              I am Karuppusamy, a self-learnt programmer. I currently live in
              India with my family. A hard-working and ambitious person who
              isn’t afraid to face a challenge.
            </p>
            <p>
              I do passionate about programming. Because I love what I do, I
              have a steady source of motivation that drives me to do my best.
            </p>
            <p>
              I love learning different skills and creating awesome projects
              based on my knowledge. I am currently learning Cloud Computing and
              Adobe Premier.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
