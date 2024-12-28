import React from "react";
import { useStaticQuery, graphql } from "gatsby";

export const Menu = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      wpMenu {
        menuItems {
          nodes {
            label
            url
          }
        }
      }
    }
  `);

  const menuItems = data.wpMenu.menuItems.nodes;

  return (
    <nav>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <a href={item.url}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
