import { Link } from "gatsby";
import React from "react";

export const CallToActionButton = ({ label, destination }) => {
  return (
    <Link
      to={destination}
      className={`mt-10 inline-block w-40 rounded-lg bg-yellow-500 p-3 text-center font-bold text-black no-underline hover:bg-amber-600`}
    >
      {label}
    </Link>
  );
};
