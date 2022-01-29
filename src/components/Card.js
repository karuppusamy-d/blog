import Image from "next/image";
import Link from "@/components/Link";

const Card = ({ title, description, imgSrc, href }) => (
  <div className="p-4 md:w-1/2 md" style={{ maxWidth: "544px" }}>
    <div className="h-full border-2 border-gray-200 border-opacity-60 dark:border-gray-700 rounded-md overflow-hidden">
      {href ? (
        <Link href={href} aria-label={`Link to ${title}`}>
          <Image
            alt={title}
            src={imgSrc}
            className="lg:h-48 md:h-36 object-cover object-center"
            width={544}
            height={306}
          />
        </Link>
      ) : (
        <Image
          alt={title}
          src={imgSrc}
          className="lg:h-48 md:h-36 object-cover object-center"
          width={544}
          height={306}
        />
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold tracking-[0.015em] mb-3">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="tracking-wide leading-relaxed text-gray-600 max-w-none dark:text-gray-300 mb-3">
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