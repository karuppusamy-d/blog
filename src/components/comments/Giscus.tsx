import { useState, useEffect, useCallback, ReactElement } from "react";
import { useTheme } from "next-themes";

type Props = { mapping: string };

const giscusConfig = {
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
  repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
  category: "General",
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
  // Emoji reactions: 1 = enable / 0 = disable
  reactions: "1",
  // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
  metadata: "0",
  // theme example: light, dark, dark_dimmed, dark_high_contrast
  // transparent_dark, preferred_color_scheme, custom
  theme: "light",
  // theme when dark mode
  darkTheme: "transparent_dark",
};

const Giscus = ({ mapping }: Props): ReactElement => {
  const [enableLoadCommentsBtn, setEnableLoadCommentsBtn] = useState(true);
  const { resolvedTheme } = useTheme();

  const commentsTheme =
    resolvedTheme === "dark" ? giscusConfig.darkTheme : giscusConfig.theme;

  const COMMENTS_ID = "comments-container";

  // Load comments
  const LoadComments = useCallback(() => {
    // Return if config is not set
    if (
      !giscusConfig.repo ||
      !giscusConfig.repositoryId ||
      !giscusConfig.categoryId
    )
      return;

    setEnableLoadCommentsBtn(false);
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", giscusConfig.repo);
    script.setAttribute("data-repo-id", giscusConfig.repositoryId);
    script.setAttribute("data-category", giscusConfig.category);
    script.setAttribute("data-category-id", giscusConfig.categoryId);
    script.setAttribute("data-mapping", mapping);
    script.setAttribute("data-reactions-enabled", giscusConfig.reactions);
    script.setAttribute("data-emit-metadata", giscusConfig.metadata);
    script.setAttribute("data-theme", commentsTheme);
    script.setAttribute("data-lang", "en");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    const comments = document.getElementById(COMMENTS_ID);
    if (comments) comments.appendChild(script);

    return () => {
      const comments = document.getElementById(COMMENTS_ID);
      if (comments) comments.innerHTML = "";
    };
  }, [commentsTheme, mapping]);

  // Reload on theme change
  useEffect(() => {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) return;
    LoadComments();
  }, [LoadComments]);

  return (
    <div className="py-6 text-center text-sm text-gray-700 dark:text-gray-300 sm:text-base">
      {/* Show load comments button */}
      {enableLoadCommentsBtn && (
        <button onClick={LoadComments}>Load Comments</button>
      )}
      <div className="giscus" id={COMMENTS_ID} />
    </div>
  );
};

export default Giscus;
