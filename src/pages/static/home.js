/** @jsx jsx */
import { jsx } from "theme-ui"
import { Grid } from "@theme-ui/components"
import { Layout, SEO, Tile } from "../../components"
import { graphql } from "gatsby"

const IndexPage = ({ data }) => {
  const {
    allFile: { nodes: placeholderImages },
  } = data

  return (
    <Layout hasHero>
      <SEO title="Home" />
      <div sx={{ marginTop: 5 }}></div>
      <Grid gap={2} columns={3}>
        {placeholderImages.map(placeholderImage => (
          <Tile
            key={placeholderImage.id}
            title="Product Name"
            price={10}
            image={placeholderImage.childImageSharp.fluid}
          />
        ))}
      </Grid>
    </Layout>
  )
}

export default IndexPage

export const IndexPageQuery = graphql`
  query placeholderImages {
    allFile(filter: { relativeDirectory: { eq: "placeholder" } }) {
      nodes {
        id
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`
