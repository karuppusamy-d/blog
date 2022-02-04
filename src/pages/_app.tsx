import "@/styles/globals.css";

import { ReactElement } from "react";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import * as gtag from "@/lib/gtag";
import { SEO } from "@/components/SEO";
import LayoutWrapper from "@/components/LayoutWrapper";

const progress = new ProgressBar({
  size: 2,
  color: "#38bdf8",
  className: "progress-bar",
  delay: 100,
});

const handleRouteChange = (url: string): void => {
  progress.finish();
  gtag.pageview(url);
};

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", handleRouteChange);
Router.events.on("routeChangeError", progress.finish);

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <ThemeProvider
      defaultTheme="system"
      disableTransitionOnChange
      attribute="class"
    >
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo {...SEO} />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  );
};

export default App;
