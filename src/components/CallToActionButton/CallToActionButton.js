import { Link } from "gatsby";
import React from "react";

export const CallToActionButton = ({
  label,
  destination,
  fullWidth,
  isActive,
}) => {
  return (
    <Link
      to={destination}
      className={` ${isActive ? "cursor-default bg-yellow-400" : ""}
        
      ${
        fullWidth ? "block" : "inline-block"
      } w-50 mt-5 inline-block rounded-lg bg-yellow-500 p-3 text-center font-bold text-black no-underline hover:bg-yellow-400`}
    >
      {label}
    </Link>
  );
};
