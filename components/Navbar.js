// import siteMetadata from "@/data/siteMetadata";
import headerNavLinks from "@/data/headerNavLinks";
import Logo from "@/data/logo.svg";
import Link from "./Link";
import MobileNav from "./MobileNav";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {
  return (
    <header className="fixed top-0 inset-x-0 bg-white dark:bg-gray-900 z-50	shadow-sm dark:shadow-dark">
      <nav className="flex items-center justify-between py-5 max-w-3xl px-8 mx-auto sm:px-8 xl:max-w-5xl xl:px-0 ">
        <div>
          <Link href="/" aria-label="Karuppusamy">
            <div className="flex items-center justify-between">
              <div className="mr-3">
                <Logo />
              </div>
              {/* {typeof siteMetadata.headerTitle === "string" ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
              {siteMetadata.headerTitle}
              </div>
              ) : (
                siteMetadata.headerTitle
              )} */}
            </div>
          </Link>
        </div>
        <div className="flex items-center text-base leading-5">
          <div className="hidden sm:block">
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100"
              >
                {link.title}
              </Link>
            ))}
          </div>
          <ThemeSwitch />
          <MobileNav />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
