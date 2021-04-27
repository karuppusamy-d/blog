import Link from "./Link";
import siteMetadata from "@/data/siteMetadata";
import SocialIcon from "@/components/social-icons";

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center border-t-2">
        <div className="flex mt-8 mb-4 space-x-4">
          {/* <SocialIcon
            kind="gmail"
            href={`mailto:${siteMetadata.email}`}
            size={6}
          /> */}
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
          {/* <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} /> */}
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          {/* <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} /> */}
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
        </div>
        <div className="flex mb-6 space-x-2 text-sm text-gray-500 dark:text-gray-400">
          {/* <div>{siteMetadata.author}</div> */}
          {/* <div>{` • `}</div> */}
          {/* <div>{`© ${new Date().getFullYear()}`}</div> */}
          <div>{`© 2021`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
      </div>
    </footer>
  );
}
