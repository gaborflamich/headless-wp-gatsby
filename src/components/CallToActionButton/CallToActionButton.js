import { Link } from "gatsby";
import React from "react";

export const CallToActionButton = ({ label, destination }) => {
  return (
    <Link
      to={destination}
      className={`w-50 mt-5 inline-block rounded-lg bg-yellow-500 p-3 text-center font-bold text-black no-underline hover:bg-amber-600`}
    >
      {label}
    </Link>
  );
};
