import React, { ReactElement } from "react";
import SideNavLinks from "@/components/SideNav/SideNavLinks";
import routes from "@/data/docs/routes.json";

const SideNav = (): ReactElement => {
  return (
    <aside className="scroll-bar sticky top-[7.5rem] hidden max-h-[calc(100vh-9.5rem)] w-64 overflow-y-scroll xl:block">
      <h4 className="mb-4 text-lg font-semibold">Documentation</h4>
      <ul className="submenu flex flex-col gap-4">
        <SideNavLinks routes={routes} />
      </ul>
    </aside>
  );
};

export default SideNav;
