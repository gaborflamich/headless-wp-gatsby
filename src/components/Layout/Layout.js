import React, { useEffect, useState } from "react";
import { useLocation } from "@reach/router";
import { Header } from "../Header";

export const Layout = ({ children, title }) => {
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    setIsHomePage(location.pathname === "/");
  }, [location]);

  return (
    <div>
      <Header />
      {!isHomePage && (
        <div className="container">
          <h1 className="mb-8 text-3xl font-bold">{title}</h1>
        </div>
      )}
      {children}
    </div>
  );
};
