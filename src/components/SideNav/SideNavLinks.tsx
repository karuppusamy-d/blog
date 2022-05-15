import { Route } from "@/lib/mdx/types";
import { ReactElement, useState } from "react";
import Link from "@/components/Link";
import ArrowIcon from "./arrow.svg";

const SideNavLinks = ({ routes }: { routes: Route[] }): ReactElement => {
  return (
    <>
      {routes.map((route, key) => (
        <NavLink key={key} route={route} />
      ))}
    </>
  );
};

const NavLink = ({ route }: { route: Route }): ReactElement => {
  const [showMenu, setShowMenu] = useState<boolean>(route.open || false);
  const toggleMenu = (): void => setShowMenu((curr) => !curr);

  if (!Array.isArray(route.routes))
    return (
      <li>
        <Link href={`/docs/${route.path}`}>{route.title}</Link>
      </li>
    );

  return (
    <div>
      <button
        className="flex cursor-pointer items-center gap-2"
        onClick={toggleMenu}
        role="menu"
      >
        <ArrowIcon />
        <div>{route.title}</div>
      </button>

      <ul
        className={`submenu mt-4 flex flex-col gap-4 children:ml-4 ${
          showMenu ? "" : "hidden"
        }`}
      >
        <SideNavLinks routes={route.routes} />
      </ul>
    </div>
  );
};

export default SideNavLinks;
