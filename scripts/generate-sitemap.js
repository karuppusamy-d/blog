import { writeFileSync } from "fs";
import { globby } from "globby";
import prettier from "prettier";
import siteMetadata from "../data/siteMetadata.js";

(async () => {
  console.log("Generating sitemap...");

  const pages = await globby([
    "src/pages/*.tsx",
    "data/blog/**/*.mdx",
    "data/blog/**/*.md",
    "public/tags/**/*.xml",
    "!src/pages/_*.tsx",
    "!src/pages/api",
    "!src/pages/404.tsx",
    "!src/pages/index.tsx",
  ]);

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>${siteMetadata.siteUrl}</loc>
            </url>
            
            ${pages
              .map((page) => {
                const path = page
                  .replace("src/pages/", "/")
                  .replace("data/blog", "/blog")
                  .replace("public/", "/")
                  .replace(".tsx", "")
                  .replace(".mdx", "")
                  .replace(".md", "")
                  .replace("/index.xml", "");

                return `
                        <url>
                            <loc>${siteMetadata.siteUrl}${path}</loc>
                        </url>
                    `;
              })
              .join("")}
        </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    parser: "html",
  });

  writeFileSync("public/sitemap.xml", formatted);
})();
