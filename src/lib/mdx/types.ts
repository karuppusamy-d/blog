export type FrontMatter = {
  title: string;
  date: string;
  slug: string;
  lastmod?: string;
  tags: string[];
  draft: boolean;
  summary: string;
  images: string[];
};

export type Post = {
  mdxSource: string;
  frontMatter: FrontMatter & {
    fileName: string;
    readingTime: string;
  };
};

export type GetAllFilesFrontMatter = (folder: string) => Promise<FrontMatter[]>;

export type GetFileBySlug = (type: string, slug: string) => Promise<Post>;
