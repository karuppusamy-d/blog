import fs from "fs";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";
import renderToString from "next-mdx-remote/render-to-string";
import getAllFilesRecursively from "./utils/files";
import MDXComponents from "@/components/MDXComponents";
import imgToJsx from "./img-to-jsx";

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
  const mdxPath = path.join(root, "data", type, `${slug.join("/")}.mdx`);
  const mdPath = path.join(root, "data", type, `${slug.join("/")}.md`);
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, "utf8")
    : fs.readFileSync(mdPath, "utf8");

  const { data, content } = matter(source);
  const mdxSource = await renderToString(content, {
    components: MDXComponents,
    mdxOptions: {
      remarkPlugins: [
        require("remark-slug"),
        require("remark-autolink-headings"),
        require("remark-code-titles"),
        require("remark-math"),
        imgToJsx,
      ],
      inlineNotes: true,
      rehypePlugins: [require("rehype-katex"), require("@mapbox/rehype-prism")],
    },
  });

  return {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
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
