import { ReactElement } from "react";
import headerNavLinks from "@/data/headerNavLinks";
import Logo from "@/data/logo.svg";
import Link from "@/components/Link";
import MobileNav from "@/components/MobileNav";
import ThemeSwitch from "@/components/ThemeSwitch";

const Navbar = (): ReactElement => {
  return (
    <header>
      <div className="fixed top-0 inset-x-0 bg-white dark:bg-gray-900 z-50 shadow-light dark:shadow-dark">
        <nav className="flex items-center justify-between text-gray-800 dark:text-gray-100 mx-auto px-6 py-4 md:py-5 xl:px-0 max-w-3xl xl:max-w-5xl">
          <Link href="/" className="flex items-center justify-between text-xl">
            <Logo aria-label="Karuppusamy" />
          </Link>

          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 sm:p-4 font-semibold"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
