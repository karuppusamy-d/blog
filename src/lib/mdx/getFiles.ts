import path from "path";
import getAllFilesRecursively from "@/lib/utils/getAllFilesRecursively";

const root = process.cwd();

const getFiles = (folder: string): string[] => {
  const prefixPaths = path.join(root, "data", folder);
  const files = getAllFilesRecursively(prefixPaths);
  // Only want to return blog/path and ignore root, replace is needed to work on Windows
  return files.map((file) =>
    file.slice(prefixPaths.length + 1).replace(/\\/g, "/")
  );
};

export { getFiles };
