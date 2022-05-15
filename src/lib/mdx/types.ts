import { ReadTimeResults } from "reading-time";

export type FrontMatter = {
  title: string;
  date: string;
  slug: string;
  lastmod?: string;
  tags: string[];
  draft?: boolean;
  summary: string;
  images: string[];
};

export type PostFrontMatter = FrontMatter & {
  fileName: string;
  readingTime: ReadTimeResults;
};

export type Post = {
  mdxSource: string;
  frontMatter: PostFrontMatter;
};

export type Route = {
  title: string;
  path?: string;
  open?: boolean;
  routes?: Route[];
};

export type GetAllFilesFrontMatter = (folder: string) => Promise<FrontMatter[]>;

export type GetFileBySlug = (type: string, slug: string) => Promise<Post>;

export type ObjectMap<TValue = number | string | boolean | unknown> = {
  [key: string]: TValue;
};
