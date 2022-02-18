import { ReactElement } from "react";
import headerNavLinks from "@/data/headerNavLinks";
import Logo from "@/data/logo.svg";
import Link from "@/components/Link";
import MobileNav from "@/components/MobileNav";
import ThemeSwitch from "@/components/ThemeSwitch";

const Navbar = (): ReactElement => {
  return (
    <header>
      <div className="fixed inset-x-0 top-0 z-50 bg-white shadow-light dark:bg-gray-900 dark:shadow-dark">
        <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4 text-gray-800 dark:text-gray-100 md:py-5 xl:max-w-5xl xl:px-0">
          <Link href="/" className="flex items-center justify-between text-xl">
            <Logo aria-label="Karuppusamy" />
          </Link>

          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-semibold sm:p-4"
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
