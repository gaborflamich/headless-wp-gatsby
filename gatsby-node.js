const path = require("path");

exports.createPages = async ({ actions, graphql }) => {
  const pageTemplate = path.resolve("src/templates/page.js");
  const { createPage } = actions;

  const { data } = await graphql(`
    query AllPagesQuery {
      allWpPage {
        nodes {
          databaseId
          blocks
          uri
        }
      }
    }
  `);
  for (let i = 0; i < data.allWpPage.nodes.length; i++) {
    const page = data.allWpPage.nodes[i];
    createPage({
      path: page.uri,
      component: pageTemplate,
    });
  }
};
