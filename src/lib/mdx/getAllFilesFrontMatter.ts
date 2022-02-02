import { readFileSync } from "fs";
import matter from "gray-matter";
import path from "path";
import getAllFilesRecursively from "@/lib/utils/getAllFilesRecursively";
import { FrontMatter, GetAllFilesFrontMatter } from "./types";

const root = process.cwd();

const getAllFilesFrontMatter: GetAllFilesFrontMatter = async (folder) => {
  const prefixPaths = path.join(root, "data", folder);
  const files = getAllFilesRecursively(prefixPaths);

  const allFrontMatter = [] as FrontMatter[];

  files.forEach((file) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, "/");
    // Remove Unexpected File
    if (path.extname(fileName) !== ".md" && path.extname(fileName) !== ".mdx") {
      return;
    }
    const source = readFileSync(file, "utf8");
    const { data } = matter(source);
    const frontmatter = data as FrontMatter;
    if (frontmatter.draft !== true) {
      allFrontMatter.push({
        ...frontmatter,
        slug: formatSlug(fileName),
        date: new Date(frontmatter.date).toISOString(),
      });
    }
  });

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date));
};

const dateSortDesc = (a: string, b: string): number => {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
};

const formatSlug = (slug: string): string => {
  return slug.replace(/\.(mdx|md)/, "");
};

export { formatSlug, getAllFilesFrontMatter };
