import React, { useState, useEffect } from "react";
import { useLocation } from "@reach/router";

import { Menu } from "../Menu";
import { Logo } from "../Logo";

export const Header = () => {
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    setIsHomePage(location.pathname === "/");
  }, [location]);

  return (
    <header
      className={`${isHomePage ? "mb-0" : "mb-10"}
    header bg-emerald-900 py-4 font-bold text-white`}
    >
      <div className="container flex justify-between">
        <Logo />
        <Menu />
      </div>
    </header>
  );
};
