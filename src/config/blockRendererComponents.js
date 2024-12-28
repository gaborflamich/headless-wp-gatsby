import React from "react";
import {
  BlockRenderer,
  getStyles,
  getClasses,
} from "@webdeveducation/wp-block-tools";

import { MediaText } from "../components";

export const BlockRendererComponents = (block) => {
  switch (block.name) {
    case "core/media-text": {
      return (
        <MediaText
          key={block.id}
          className={getClasses(block)}
          style={getStyles(block)}
          verticalAlignment={block.attributes.verticalAlignment}
          gatsbyImage={block.attributes.gatsbyImage}
          mediaPosition={block.attributes.mediaPosition}
        >
          <BlockRenderer blocks={block.innerBlocks} />
        </MediaText>
      );
    }
    default:
      return null;
  }
};
