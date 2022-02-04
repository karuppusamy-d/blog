import { ReactElement } from "react";
import { NextSeo, ArticleJsonLd } from "next-seo";
import siteMetadata from "@/data/siteMetadata";
import { FrontMatter } from "@/lib/mdx/types";

type PageSeoProps = { title: string; description: string; url: string };
type BlogSeoProps = { url: string } & FrontMatter;

const SEO = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  openGraph: {
    type: "website",
    locale: siteMetadata.language,
    url: siteMetadata.siteUrl,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [
      {
        url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
        alt: siteMetadata.title,
        width: 2100,
        height: 1200,
      },
    ],
  },
  twitter: {
    handle: siteMetadata.twitter,
    site: siteMetadata.twitter,
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "author",
      content: siteMetadata.author,
    },
  ],
};

const PageSeo = ({ title, description, url }: PageSeoProps): ReactElement => {
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={url}
      openGraph={{
        url,
        title,
        description,
      }}
    />
  );
};

const BlogSeo = ({
  title,
  summary,
  date,
  lastmod,
  url,
  tags,
  images = [],
}: BlogSeoProps): ReactElement => {
  const publishedAt = new Date(date).toISOString();
  const modifiedAt = new Date(lastmod || date).toISOString();
  const imagesArr =
    images.length === 0
      ? [`${siteMetadata.siteUrl}${siteMetadata.socialBanner}`]
      : images.map((img) => `${siteMetadata.siteUrl}${img}`);

  const featuredImages = imagesArr.map((img) => {
    return {
      url: img,
      alt: title,
    };
  });

  return (
    <>
      <NextSeo
        title={`${title} | ${siteMetadata.title}`}
        description={summary}
        canonical={url}
        openGraph={{
          type: "article",
          article: {
            publishedTime: publishedAt,
            modifiedTime: modifiedAt,
            authors: [`${siteMetadata.siteUrl}/about`],
            tags,
          },
          url,
          title,
          description: summary,
          images: featuredImages,
        }}
        additionalMetaTags={[
          {
            name: "twitter:image",
            content: featuredImages[0].url,
          },
        ]}
      />
      <ArticleJsonLd
        authorName={siteMetadata.author}
        dateModified={modifiedAt}
        datePublished={publishedAt}
        description={summary}
        images={imagesArr}
        publisherName={siteMetadata.author}
        title={title}
        url={url}
      />
    </>
  );
};

export { SEO, PageSeo, BlogSeo };
