import Link from "next/link";
import { ReactElement } from "react";

const NotFound = (): ReactElement => {
  return (
    <div className="flex min-h-[80vh] flex-col items-start justify-center divide-y divide-gray-200 dark:divide-gray-700 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
      <div className="pb-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-6xl">
          404
        </h1>
      </div>
      <div className="max-w-md pt-5 md:p-0">
        <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
          Sorry we couldn&apos;t find this page.
        </p>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          But dont worry, you can find plenty of other things on our homepage.
        </p>
        <Link href="/" passHref>
          <button className="btn">Back to homepage</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
