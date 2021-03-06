import { visit } from "unist-util-visit";
import sizeOf from "image-size";
import fs from "fs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Node = import("unist").Node & { children: any };

const remarkImgToJsx = () => {
  return (tree: Node) => {
    visit(
      tree,
      // only visit p tags that contain an img element
      (node) =>
        node.type === "paragraph" &&
        (node as Node).children.some((n: Node) => n.type === "image"),
      (node) => {
        const imageNode = node.children.find((n: Node) => n.type === "image");

        // only local files
        if (fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
          const dimensions = sizeOf(`${process.cwd()}/public${imageNode.url}`);

          // Convert original node to next/image
          (imageNode.type = "mdxJsxFlowElement"),
            (imageNode.name = "Image"),
            (imageNode.attributes = [
              { type: "mdxJsxAttribute", name: "alt", value: imageNode.alt },
              { type: "mdxJsxAttribute", name: "src", value: imageNode.url },
              {
                type: "mdxJsxAttribute",
                name: "width",
                value: dimensions.width,
              },
              {
                type: "mdxJsxAttribute",
                name: "height",
                value: dimensions.height,
              },
            ]);

          // Change node type from p to div to avoid nesting error
          node.type = "div";
          node.children = [imageNode];
        }
      }
    );
  };
};

export default remarkImgToJsx;
