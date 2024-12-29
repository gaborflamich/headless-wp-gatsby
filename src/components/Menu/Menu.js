import React from "react";
import { useStaticQuery, graphql } from "gatsby";

export const Menu = () => {
  const data = useStaticQuery(graphql`
    query MainMenuQuery {
      wpMenu {
        menuItems {
          nodes {
            label
            url
            parentId
            id
            cssClasses
          }
        }
      }
    }
  `);

  const menuItems = data.wpMenu.menuItems.nodes;

  const buildMenuTree = (items) => {
    const menuMap = {};
    const menuTree = [];

    // Minden menüpontot objektumba rendezzük ID alapján
    items.forEach((item) => {
      menuMap[item.id] = { ...item, children: [] };
    });

    // Hierarchia felépítése
    items.forEach((item) => {
      if (item.parentId) {
        menuMap[item.parentId].children.push(menuMap[item.id]);
      } else {
        menuTree.push(menuMap[item.id]);
      }
    });

    return menuTree;
  };

  const MenuList = ({ items, level = 0 }) => {
    // Meghatározzuk a megfelelő className-t a szint alapján
    const ulClassName = level === 0 ? "desktop-menu-list" : `sub-menu-${level}`;

    return (
      <ul className={ulClassName}>
        {items.map((item) => (
          <li
            key={item.id}
            className={`menu-item ${
              item.children && item.children.length > 0
                ? "menu-item-has-children"
                : ""
            } ${item.cssClasses && item.cssClasses.join(" ")}`}
          >
            <a href={item.url} className="menu-item-link">
              {item.label}
            </a>
            {item.children && item.children.length > 0 && (
              <MenuList items={item.children} level={level + 1} />
            )}
          </li>
        ))}
      </ul>
    );
  };

  // Hierarchikus struktúra létrehozása
  const menuTree = buildMenuTree(menuItems);

  return (
    <nav className="desktop-menu">
      <MenuList items={menuTree} />
    </nav>
  );
};
