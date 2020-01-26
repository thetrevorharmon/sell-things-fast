/** @jsx jsx */
import { useState, useEffect, useMemo } from "react"
import { Styled, jsx } from "theme-ui"
import Img from "gatsby-image"
import { Grid, Button, Alert, Close } from "@theme-ui/components"
import { Layout, SEO } from "../components"
import { Thumbnail, OptionPicker } from "./components"
import { graphql } from "gatsby"
import { prepareVariantsWithOptions, prepareVariantsImages } from "./utilities"
import { useAddItemToCart } from "../context/StoreContext"

const ProductPage = ({ data: { shopifyProduct: product } }) => {
  const colors = product.options.find(
    option => option.name.toLowerCase() === "color"
  ).values
  const sizes = product.options.find(
    option => option.name.toLowerCase() === "size"
  ).values

  const variants = useMemo(() => prepareVariantsWithOptions(product.variants), [
    product.variants,
  ])
  const images = useMemo(() => prepareVariantsImages(variants, "color"), [
    variants,
  ])

  if (images.length < 1) {
    throw new Error("Must have at least one product image!")
  }

  const addItemToCart = useAddItemToCart()
  const [variant, setVariant] = useState(variants[0])
  const [color, setColor] = useState(variant.color)
  const [size, setSize] = useState(variant.size)
  const [addedToCartMessage, setAddedToCartMessage] = useState(null)

  useEffect(() => {
    const newVariant = variants.find(variant => {
      return variant.size === size && variant.color === color
    })

    if (variant.shopifyId !== newVariant.shopifyId) {
      setVariant(newVariant)
    }
  }, [size, color, variants, variant.shopifyId])

  const gallery =
    images.length > 1 ? (
      <Grid gap={2} columns={6}>
        {images.map(({ src, color }) => (
          <Thumbnail key={color} src={src} onClick={() => setColor(color)} />
        ))}
      </Grid>
    ) : null

  function handleAddToCart() {
    addItemToCart(variant.shopifyId, 1)
    setAddedToCartMessage("🛒 Added to your cart!")
  }

  return (
    <Layout>
      <SEO title={product.title} />
      {addedToCartMessage ? (
        <Alert sx={{ mb: 4 }} variant="primary">
          {addedToCartMessage}
          <Close
            ml="auto"
            mr={-2}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => setAddedToCartMessage(null)}
          />
        </Alert>
      ) : null}
      <Grid gap={4} columns={2}>
        <div>
          <div
            sx={{
              border: "1px solid gray",
              padding: 2,
              marginBottom: 2,
            }}
          >
            <Img fluid={variant.image.localFile.childImageSharp.fluid} />
          </div>
          {gallery}
        </div>
        <div sx={{ display: "flex", flexDirection: "column" }}>
          <Styled.h1 sx={{ mt: 0, mb: 2 }}>{product.title}</Styled.h1>
          <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
          <div>
            <Grid padding={2} columns={2}>
              <OptionPicker
                key="Color"
                name="Color"
                options={colors}
                selected={color}
                onChange={event => setColor(event.target.value)}
              />
              <OptionPicker
                key="Size"
                name="Size"
                options={sizes}
                selected={size}
                onChange={event => setSize(event.target.value)}
              />
            </Grid>
          </div>
          <Button
            sx={{ margin: 2, display: "block" }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
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
      options {
        name
        values
      }
      variants {
        shopifyId
        selectedOptions {
          name
          value
        }
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 446) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
