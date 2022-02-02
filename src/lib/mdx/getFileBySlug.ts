import { existsSync, readFileSync } from "fs";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";
import { bundleMDX } from "mdx-bundler";
// Remark packages
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";
import remarkCodeTitles from "@/lib/remark-code-title";
import remarkImgToJsx from "@/lib/remark-img-to-jsx";
// Rehype packages
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrismPlus from "rehype-prism-plus";
import rehypePresetMinify from "rehype-preset-minify";

const root = process.cwd();

const getFileBySlug: GetFileBySlug = async (type, slug) => {
  const mdxPath = path.join(root, "data", type, `${slug}.mdx`);
  const mdPath = path.join(root, "data", type, `${slug}.md`);
  const source = existsSync(mdxPath)
    ? readFileSync(mdxPath, "utf8")
    : readFileSync(mdPath, "utf8");

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      root,
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      root,
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }

  // Parsing frontmatter here to pass it in as options to rehype plugin
  const { data } = matter(source);
  const frontmatter = data as FrontMatter;

  const { code } = await bundleMDX({
    source,
    // mdx imports can be automatically source from the components directory
    cwd: path.join(root, "components"),
    xdmOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        remarkCodeTitles,
        [remarkFootnotes, { inlineNotes: true }],
        remarkImgToJsx,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        [rehypePrismPlus, { ignoreMissing: true }],
        rehypePresetMinify,
      ];
      return options;
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        ".js": "jsx",
      };
      return options;
    },
  });

  return {
    mdxSource: code,
    frontMatter: {
      readingTime: readingTime(code),
      slug: slug || null,
      fileName: existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...frontmatter,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
    },
  };
};

export default getFileBySlug;
