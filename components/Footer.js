import Link from "./Link";
import siteMetadata from "@/data/siteMetadata";
import SocialIcon from "@/components/social-icons";

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center border-t-[1px] border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-200">
        <div className="flex mt-[1.75rem] mb-3 text-xl space-x-3">
          <SocialIcon kind="facebook" href={siteMetadata.facebook} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} />
          {/* <SocialIcon kind="instagram" href={siteMetadata.instagram} /> */}
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
          {/* <SocialIcon kind="youtube" href={siteMetadata.youtube}/> */}
          <SocialIcon kind="github" href={siteMetadata.github} />
          <SocialIcon kind="gmail" href={`mailto:${siteMetadata.email}`} />
        </div>
        <div className="flex mb-6 space-x-2 text-md">
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
      </div>
    </footer>
  );
}
