import { readdirSync, statSync } from "fs";
import path from "path";

/**
 * Returns an array of all files in a directory and its subdirectories.
 * @param folder path to directory to search (must be absolute)
 * @returns array of files in directory and subdirectories.
 */
const getAllFilesRecursively = (directory: string): string[] => {
  // Get all files in the directory
  const files = readdirSync(directory);

  // Convert to absolute paths
  const filePaths = files.map((file) => path.join(directory, file));

  // Get all files in subfolders
  const res = filePaths.map((fullPath) => {
    return statSync(fullPath).isFile()
      ? fullPath
      : getAllFilesRecursively(fullPath);
  });

  // flatten array and return
  return res.flat();
};

export default getAllFilesRecursively;
