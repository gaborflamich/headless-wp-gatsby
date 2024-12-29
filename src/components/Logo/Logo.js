import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";

export const Logo = () => {
  return (
    <div className="header-logo flex items-center">
      <Link to="/" className="no-underline">
        <StaticImage
          src="../../../static/icon.png"
          layout="fixed"
          height="30"
          alt="Logo"
        />
      </Link>
    </div>
  );
};
