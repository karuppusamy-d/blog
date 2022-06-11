import { ReactElement } from "react";
import Logo from "@/data/logo.svg";
import Link from "@/components/Link";
import MobileNav from "./MobileNav";
import ThemeSwitch from "./ThemeSwitch";

export type NavLinks = {
  href: string;
  title: string;
}[];

const navLinks: NavLinks = [
  { href: "/", title: "Home" },
  { href: "/blog", title: "Blog" },
  { href: "/tags", title: "Tags" },
  { href: "/projects", title: "Projects" },
  { href: "/about", title: "About" },
];

const Navbar = (): ReactElement => {
  return (
    <header>
      <div className="fixed inset-x-0 top-0 z-50 bg-white shadow-light backdrop-blur-[5px] backdrop-saturate-150 dark:bg-black/50 dark:shadow-dark">
        <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4 text-gray-900 dark:text-gray-100 md:py-[18px] xl:max-w-5xl xl:px-0">
          <Link href="/" className="flex items-center justify-between text-xl">
            <Logo aria-label="Karuppusamy" />
          </Link>

          <div className="flex items-center text-base leading-5">
            <div className="hidden md:block">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-semibold md:p-4"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav navLinks={navLinks} />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
