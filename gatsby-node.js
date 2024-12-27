const path = require("path");
const { Component } = require("react");
const assignIds = require("@webdeveducation/wp-block-tools");

exports.createPages = async ({actions, graphql}) => {
    const pageTemplate = path.resolve('src/templates/page.js');
    const {createPage} = actions;

    const {data} = await graphql(`
        query AllPagesQuery {
            allWpPage {
                nodes {
                blocks
                title
                databaseId
                uri
                }
            }
        }    
    `);
    for(let i = 0; i < data.allWpPage.nodes.length; i++){
        const page = data.allWpPage.nodes[i];
        let blocks = page.blocks;

        blocks = assignIds(blocks);
        createPage({
            path: page.uri,
            component: pageTemplate,
            context: {
                blocks,
            }
        });
    }
};