import Gmail from "./gmail.svg";
import Github from "./github.svg";
import Facebook from "./facebook.svg";
import Instagram from "./instagram.svg";
import Youtube from "./youtube.svg";
import Linkedin from "./linkedin.svg";
import Twitter from "./twitter.svg";
import Whatsapp from "./whatsapp.svg";

// Icons taken from: https://simpleicons.org/

const components = {
  gmail: Gmail,
  github: Github,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  whatsapp: Whatsapp,
};

const SocialIcon = ({ kind, href }) => {
  if (!href) return null;

  const SocialSvg = components[kind];

  return (
    <a target="_blank" rel="noopener noreferrer" href={href}>
      <span className="sr-only">{kind}</span>
      <SocialSvg className="fill-current hover:text-blue-500 dark:hover:text-blue-400 h-[1em] transition-colors duration-500" />
    </a>
  );
};

export default SocialIcon;
