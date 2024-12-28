import { graphql, useStaticQuery } from "gatsby";
import React from "react";

export const Menu = () => {
  const data = useStaticQuery(graphql`
    query MainMenuQuery {
      acfOptionsMainMenu {
        mainMenu {
          callToActionButton {
            destination {
              nodes {
                ... on Page {
                  uri
                }
              }
            }
            label
          }
          menuItems {
            root {
              destination {
                nodes {
                  ... on Page {
                    uri
                  }
                }
              }
              label
            }
            subMenuItems {
              destination {
                nodes {
                  ... on Page {
                    uri
                  }
                }
              }
              label
            }
          }
        }
      }
    }
  `);
  console.log("MAIN MENU DATA: ", data);
  return (
    <div className="sticky top-0 z-20 h-16 bg-emerald-800 px-4 font-bold text-white">
      Menu
    </div>
  );
};
