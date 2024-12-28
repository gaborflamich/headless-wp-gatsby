import React from "react";
import { BlockRendererProvider } from "@webdeveducation/wp-block-tools";
import { BlockRendererComponents } from "../config/blockRendererComponents";
import { Link } from "gatsby";

const Page = (props) => {
  console.log("Page props: ", props);
  return (
    <BlockRendererProvider
      allBlocks={props.pageContext.blocks}
      renderComponent={BlockRendererComponents}
      siteDomain={process.env.GATSBY_WP_URL}
      customInternalLinkComponent={(
        { children, internalHref, className },
        index
      ) => {
        return (
          <Link to={internalHref} className={className} key={index}>
            {children}
          </Link>
        );
      }}
    />
  );
};

export default Page;
