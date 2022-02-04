![karuppusamy-banner](/public/static/images/twitter-card.png)

# Karuppusamy's Blog

I am Karuppusamy, a software engineer. I know JavaScript, Python, C++, C, Java, HTML, CSS, and some other programming languages. I also know android development, web development, and arduino programming.

This blog is a place where I write about programming, and other things that I find interesting.

[karuppusamy.me](https://karuppusamy.me/)

## Post

### Compose

Run `yarn compose ${title} ${md|mdx}` or `npm run compose ${title} ${md|mdx}` to create a new post.

The first argument is the name of the post and the second optional argument is the extension (default to .mdx)

Example code to generate the post called "My First Post" in markdown format

```powershell
yarn compose "My First Post" .mdx

# or

npm run compose "My First Post" .mdx
```

This will generate `./data/blog/my-first-post.mdx` with pre-filled front matter.

### Frontmatter

Currently 7 fields are supported.

```
title (required)
date (required)
tags (required, can be empty array)
lastmod (optional)
draft (optional)
summary (required)
images (required, if none provided defaults to socialBanner in siteMetadata config)
```

## Credits

This is a modified version of [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) by [Timothy](https://github.com/timlrx).

This blog is built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/) and hosted on [Vercel](https://vercel.com/).

## Licence

[MIT](https://github.com/karuppusamy-d/blog/blob/main/LICENSE) © [Karuppusamy](https://karuppusamy.me)

Made with ❤️ by [Karuppusamy](https://karuppusamy.me/)
