/** @jsx jsx */
import { useState } from "react"
import { Styled, jsx } from "theme-ui"
import Img from "gatsby-image"
import { Grid, Select, Label, Button } from "@theme-ui/components"
import { Layout, SEO } from "../../components"
import { useStaticQuery, graphql } from "gatsby"

const ProductPage = () => {
  const {
    allFile: { nodes: productImages },
  } = useStaticQuery(graphql`
    query placeholderProductPage {
      allFile(filter: { relativeDirectory: { eq: "placeholder" } }) {
        nodes {
          id
          childImageSharp {
            fluid(maxWidth: 445) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  `)

  if (productImages.length < 1) {
    throw new Error("Must have product images!")
  }

  const [image, setImage] = useState(productImages[0])
  const colors = ["Blue", "Black", "Green"]
  const sizes = ["Small", "Medium", "Large"]

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
          fluid={image.childImageSharp.fluid}
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
        <Img fluid={image.childImageSharp.fluid} />
      </div>
      <Grid gap={2} columns={6}>
        {productImages.map(productImage => (
          <Thumbnail key={productImage.id} image={productImage} />
        ))}
      </Grid>
    </div>
  )

  const description = (
    <div>
      <Styled.p>
        This is where the product description goes. It's where you can learn
        more about the product.
      </Styled.p>
      <Styled.ul>
        <li>There's a hat</li>
        <li>There's a pair of glasses</li>
        <li>There's a shoe</li>
        <li>They're all drawings, which makes them pretty hard to wear</li>
      </Styled.ul>
    </div>
  )

  return (
    <Layout>
      <SEO title="Product Name" />
      <Grid gap={4} columns={2}>
        {gallery}
        <div sx={{ display: "flex", flexDirection: "column" }}>
          <Styled.h1 sx={{ mt: 0, mb: 2 }}>Product Name</Styled.h1>
          {description}
          <div>
            <Grid padding={2} columns={2}>
              <div>
                <Label>Color</Label>
                <Select defaultValue={colors[0]}>
                  {colors.map(color => (
                    <option value={color}>{color}</option>
                  ))}
                </Select>
              </div>
              <div>
                <Label>Size</Label>
                <Select defaultValue={sizes[0]}>
                  {sizes.map(size => (
                    <option value={size}>{size}</option>
                  ))}
                </Select>
              </div>
            </Grid>
          </div>
          <Button sx={{ margin: 2, display: "block" }}>Add to Cart</Button>
        </div>
      </Grid>
    </Layout>
  )
}

export default ProductPage
