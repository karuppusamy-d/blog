import fs from "fs";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";
import { serialize } from "next-mdx-remote/serialize";
import getAllFilesRecursively from "./utils/files";
import MDXComponents from "@/components/MDXComponents";
import imgToJsx from "./img-to-jsx";

// Plugins
import remarkSlug from "remark-slug";
import remarkAutolinkHeadings from "remark-autolink-headings";
import remarkCodeTitles from "remark-code-titles";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrism from "@mapbox/rehype-prism";

const root = process.cwd();

export function getFiles(type) {
  const prefixPaths = path.join(root, "data", type);
  const files = getAllFilesRecursively(prefixPaths);
  // Only want to return blog/path and ignore root, replace is needed to work on Windows
  return files.map((file) =>
    file.slice(prefixPaths.length + 1).replace(/\\/g, "/")
  );
}

export function formatSlug(slug) {
  return slug.replace(/\.(mdx|md)/, "");
}

export function dateSortDesc(a, b) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

export async function getFileBySlug(type, slug) {
  const mdxPath = path.join(root, "data", type, `${slug}.mdx`);
  const mdPath = path.join(root, "data", type, `${slug}.md`);
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, "utf8")
    : fs.readFileSync(mdPath, "utf8");

  const { data, content } = matter(source);
  const mdxSource = await serialize(content, {
    components: MDXComponents,
    mdxOptions: {
      remarkPlugins: [
        remarkSlug,
        remarkAutolinkHeadings,
        remarkCodeTitles,
        remarkMath,
        imgToJsx,
      ],
      rehypePlugins: [rehypeKatex, rehypePrism],
    },
  });

  return {
    mdxSource,
    frontMatter: {
      readingTime: readingTime(content),
      slug: slug || null,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...data,
    },
  };
}

export async function getAllFilesFrontMatter(folder) {
  const prefixPaths = path.join(root, "data", folder);
  const files = getAllFilesRecursively(prefixPaths);

  const allFrontMatter = [];

  files.forEach((file) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, "/");
    const source = fs.readFileSync(file, "utf8");
    const { data } = matter(source);
    if (data.draft !== true) {
      allFrontMatter.push({ ...data, slug: formatSlug(fileName) });
    }
  });

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date));
}