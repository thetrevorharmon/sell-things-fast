/** @jsx jsx */
import { useState, useEffect } from "react"
import { Styled, jsx } from "theme-ui"
import Img from "gatsby-image"
import { Grid, Select, Label, Button } from "@theme-ui/components"
import { Layout, SEO } from "../components"
import { graphql } from "gatsby"

function prepareVariantsWithOptions(variants) {
  return variants.map(variant => {
    // convert the options to a dictionary instead of an array
    const optionsDictionary = variant.selectedOptions.reduce(
      (options, option) => {
        options[`${option.name.toLowerCase()}`] = option.value
        return options
      },
      {}
    )

    // return an object with all of the variant properties + the options at the top level
    return {
      ...optionsDictionary,
      ...variant,
    }
  })
}

function prepareVariantsImages(variants) {
  const imageDictionary = variants.reduce((images, variant) => {
    images[variant.color] = variant.image.localFile.childImageSharp.fluid
    return images
  }, {})

  const images = Object.keys(imageDictionary).map(key => {
    return {
      color: key,
      fluid: imageDictionary[key],
    }
  })

  return images
}

const ProductPage = ({ data: { shopifyProduct: product } }) => {
  const colors = product.options.find(option => option.name === "Color").values
  const sizes = product.options.find(option => option.name === "Size").values
  const variants = prepareVariantsWithOptions(product.variants)
  const images = prepareVariantsImages(variants)

  if (images.length < 1) {
    throw new Error("Must have at least one product image!")
  }

  const [variant, setVariant] = useState(variants[0])
  const [color, setColor] = useState(variant.color)
  const [size, setSize] = useState(variant.size)

  useEffect(() => {
    const newVariant = variants.find(variant => {
      return variant.size === size && variant.color === color
    })
    setVariant(newVariant)
  }, [size, color])

  const Thumbnail = ({ fluid, color }) => {
    return (
      <div
        sx={{
          cursor: "pointer",
          border: "1px solid gray",
          padding: 1,
        }}
      >
        <Img fluid={fluid} onClick={() => setColor(color)} />
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
        <Img fluid={variant.image.localFile.childImageSharp.fluid} />
      </div>
      {images.length > 1 ? (
        <Grid gap={2} columns={6}>
          {images.map(({ fluid, color }) => (
            <Thumbnail key={color} fluid={fluid} color={color} />
          ))}
        </Grid>
      ) : null}
    </div>
  )

  const Option = ({ name, options, onChange, defaultValue }) => (
    <div>
      <Label>{name}</Label>
      <Select defaultValue={defaultValue} onChange={onChange}>
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
              <Option
                name="Color"
                options={colors}
                defaultValue={color}
                onChange={event => setColor(event.target.value)}
              />
              <Option
                name="Size"
                options={sizes}
                defaultValue={size}
                onChange={event => setSize(event.target.value)}
              />
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
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
