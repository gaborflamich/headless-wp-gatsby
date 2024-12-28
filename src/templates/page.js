import React from "react";
import {
  BlockRendererProvider,
  BlockRenderer,
  getStyles,
  getClasses,
} from "@webdeveducation/wp-block-tools";
import { GatsbyImage } from "gatsby-plugin-image";

const Page = (props) => {
  console.log("Page props: ", props);
  return (
    <BlockRendererProvider
      allBlocks={props.pageContext.blocks}
      renderComponent={(block) => {
        switch (block.name) {
          case "core/media-text": {
            const content = (
              <div className={`flex items-center p-4`}>
                <div>
                  <BlockRenderer blocks={block.innerBlocks} />
                </div>
              </div>
            );
            console.log("Render component: ", block);
            return (
              <div
                key={block.id}
                style={getStyles(block)}
                className={getClasses(block)}
              >
                {block.attributes.mediaPosition === "right" && content}
                <div>
                  <GatsbyImage alt="" image={block.attributes.gatsbyImage} />
                </div>
                {block.attributes.mediaPosition !== "right" && content}
              </div>
            );
          }
          default:
            return null;
        }
      }}
    />
  );
};

export default Page;
