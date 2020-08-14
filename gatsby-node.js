const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode })
    if (value.startsWith("/panes/")) {
      createNodeField({
        name: "pane",
        node,
        value: true,
      })
      return
    }
    createNodeField({
      name: "slug",
      node,
      value: `/posts${value}`,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }
  const posts = result.data.allMdx.edges
  posts.forEach(({ node }, index) => {
    if (node.fields != null && node.fields.slug != null) {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/components/PostPageLayout.tsx`),
        context: { id: node.id },
      })
    }
  })
}
