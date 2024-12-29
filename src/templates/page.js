import React from "react";
import { BlockRendererProvider } from "@webdeveducation/wp-block-tools";
import { BlockRendererComponents } from "../config/blockRendererComponents";
import { Link } from "gatsby";
import { Layout } from "../components/Layout/Layout";

const Page = (props) => {
  const { title, blocks } = props.pageContext;

  return (
    <Layout title={title}>
      <BlockRendererProvider
        allBlocks={blocks}
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
    </Layout>
  );
};

export default Page;
