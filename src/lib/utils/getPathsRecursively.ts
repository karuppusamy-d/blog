import { Route } from "@/lib/mdx/types";

/**
 * Returns an array of paths in the given route array.
 * @param Route[] route array to get paths from
 * @returns array of paths in the route array
 */
const getPathsRecursively = (routes: Route[]): string[] => {
  const res = routes.map((route) => {
    return route.routes ? getPathsRecursively(route.routes) : route.path || "";
  });

  return res.flat();
};

export default getPathsRecursively;
