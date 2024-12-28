import { faHourglass1 } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Page = ({ pageContext }) => {
  const { title } = pageContext;
  return (
    <div>
      <h1>{title}</h1>
      <p>This is page template</p>
    </div>
  );
};

export default Page;
