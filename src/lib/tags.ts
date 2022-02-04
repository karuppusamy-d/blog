import { getAllFilesFrontMatter } from "./mdx";
import { ObjectMap } from "./mdx/types";
import kebabCase from "./utils/kebabCase";

type GetAllTags = (type: string) => Promise<ObjectMap<number>>;

const getAllTags: GetAllTags = async (folder) => {
  const allPosts = await getAllFilesFrontMatter(folder);
  const tagCount: ObjectMap<number> = {};

  allPosts.forEach((frontmatter) => {
    if (frontmatter.tags.length > 0) {
      frontmatter.tags.forEach((tag) => {
        const formattedTag = kebabCase(tag);
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      });
    }
  });

  return tagCount;
};

export { getAllTags };
