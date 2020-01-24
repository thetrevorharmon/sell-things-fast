/** @jsx jsx */
import { jsx } from "theme-ui"
import { Grid } from "@theme-ui/components"
import { Layout, SEO, Tile } from "../components"
import { graphql } from "gatsby"

const IndexPage = ({ data }) => {
  const {
    allShopifyProduct: { nodes: products },
  } = data

  return (
    <Layout hasHero>
      <SEO title="Home" />
      <div sx={{ marginTop: 5 }}></div>
      <Grid gap={2} columns={3}>
        {products.map(product => (
          <Tile
            key={product.handle}
            slug={product.handle}
            title={product.title}
            price={Number(product.priceRange.maxVariantPrice.amount)}
            image={product.images[0].localFile.childImageSharp.fluid}
          />
        ))}
      </Grid>
    </Layout>
  )
}

export default IndexPage

export const IndexPageQuery = graphql`
  query allProducts {
    allShopifyProduct {
      nodes {
        title
        handle
        images {
          localFile {
            childImageSharp {
              fluid(maxWidth: 290) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`
