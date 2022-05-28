import { ReactElement } from "react";
import Image from "next/image";
import Link from "@/components/Link";

type Props = {
  title: string;
  description: string;
  imgSrc: string;
  href?: string;
};

const Card = ({ title, description, imgSrc, href }: Props): ReactElement => (
  <div className="md p-4 md:w-1/2" style={{ maxWidth: "544px" }}>
    <div className="h-full overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-800">
      {href ? (
        <Link href={href} aria-label={`Link to ${title}`}>
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        </Link>
      ) : (
        <Image
          alt={title}
          src={imgSrc}
          className="object-cover object-center md:h-36 lg:h-48"
          width={544}
          height={306}
        />
      )}
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold tracking-[0.015em]">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="mb-3 max-w-none leading-relaxed tracking-wide text-gray-600 dark:text-gray-300">
          {description}
        </p>
        {href && (
          <Link
            href={href}
            className="text-base font-medium leading-6 text-primary-400 hover:text-primary-500 dark:text-primary-500 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            Learn more &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
);

export default Card;
