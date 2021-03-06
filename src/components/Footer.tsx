import { ReactElement } from "react";
import Link from "@/components/Link";
import siteMetadata from "@/data/siteMetadata";
import SocialIcon from "@/components/SocialIcons";

const Footer = (): ReactElement => {
  return (
    <footer>
      <div className="flex flex-col items-center border-t-[1px] border-gray-200 text-gray-600 dark:border-gray-800 dark:text-gray-300">
        <div className="mt-[1.75rem] mb-3 flex space-x-3 text-xl">
          <SocialIcon kind="facebook" href={siteMetadata.facebook} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} />
          {/* <SocialIcon kind="instagram" href={siteMetadata.instagram} /> */}
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
          {/* <SocialIcon kind="youtube" href={siteMetadata.youtube}/> */}
          <SocialIcon kind="github" href={siteMetadata.github} />
          <SocialIcon kind="gmail" href={`mailto:${siteMetadata.email}`} />
        </div>
        <div className="mb-6 flex space-x-2">
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
