import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

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
    const ulClassName = level === 0 ? "nav-menu-list" : `sub-menu-${level}`;

    return (
      <ul
        className={`${ulClassName} ${
          level > 0
            ? "absolute z-30 w-52 bg-emerald-500 opacity-0 shadow-lg transition-opacity duration-200 ease-in-out group-hover:opacity-100"
            : "space-x-4"
        } flex justify-between text-lg group-hover:block`}
      >
        {items.map((item) => {
          const isCta = item.cssClasses.includes("menu-item-cta");

          return (
            <li
              key={item.id}
              className={`nav-menu-item group relative ${
                item.children && item.children.length > 0
                  ? "nav-menu-item-has-children"
                  : ""
              } ${item.cssClasses && item.cssClasses.join(" ")}`}
            >
              <Link
                to={item.url}
                className={`nav-menu-item-link block p-2 no-underline transition duration-200 ease-in-out ${
                  isCta
                    ? "rounded-md bg-yellow-400 px-4 py-2 text-black hover:bg-yellow-500"
                    : "hover:text-white"
                }`}
              >
                {item.label}
              </Link>
              {item.children && item.children.length > 0 && (
                <MenuList items={item.children} level={level + 1} />
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  // Hierarchikus struktúra létrehozása
  const menuTree = buildMenuTree(menuItems);

  return (
    <nav className="nav-menu">
      <MenuList items={menuTree} />
    </nav>
  );
};
