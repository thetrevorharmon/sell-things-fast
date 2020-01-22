/** @jsx jsx */
import { useState } from "react"
import { Styled, jsx } from "theme-ui"
import Img from "gatsby-image"
import { Grid, Select, Label, Button } from "@theme-ui/components"
import { Layout, SEO } from "../components"
import { graphql } from "gatsby"

const ProductPage = ({ data: { shopifyProduct: product } }) => {
  if (product.images.length < 1) {
    throw new Error("Must have at least one product image!")
  }

  const [image, setImage] = useState(product.images[0])
  const colors = product.options.find(option => option.name === "Color").values
  const sizes = product.options.find(option => option.name === "Size").values

  const Thumbnail = ({ image }) => {
    return (
      <div
        sx={{
          cursor: "pointer",
          border: "1px solid gray",
          padding: 1,
        }}
      >
        <Img
          key={image.id}
          fluid={image.localFile.childImageSharp.fluid}
          onClick={() => setImage(image)}
        />
      </div>
    )
  }

  const gallery = (
    <div>
      <div
        sx={{
          border: "1px solid gray",
          padding: 2,
          marginBottom: 2,
        }}
      >
        <Img fluid={image.localFile.childImageSharp.fluid} />
      </div>
      {product.images.length > 1 ? (
        <Grid gap={2} columns={6}>
          {product.images.map(image => (
            <Thumbnail key={image.id} image={image} />
          ))}
        </Grid>
      ) : null}
    </div>
  )

  const Option = ({ name, options }) => (
    <div>
      <Label>{name}</Label>
      <Select defaultValue={options[0]}>
        {options.map(option => (
          <option value={option}>{option}</option>
        ))}
      </Select>
    </div>
  )

  return (
    <Layout>
      <SEO title={product.title} />
      <Grid gap={4} columns={2}>
        {gallery}
        <div sx={{ display: "flex", flexDirection: "column" }}>
          <Styled.h1 sx={{ mt: 0, mb: 2 }}>{product.title}</Styled.h1>
          <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
          <div>
            <Grid padding={2} columns={2}>
              <Option name="Color" options={colors} />
              <Option name="Size" options={sizes} />
            </Grid>
          </div>
          <Button sx={{ margin: 2, display: "block" }}>Add to Cart</Button>
        </div>
      </Grid>
    </Layout>
  )
}

export default ProductPage

export const ProductPageQuery = graphql`
  query productPage($productId: String!) {
    shopifyProduct(id: { eq: $productId }) {
      id
      title
      descriptionHtml
      images {
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      options {
        name
        values
      }
      variants {
        id
        image {
          localFile {
            childImageSharp {
              id
            }
          }
        }
      }
    }
  }
`
