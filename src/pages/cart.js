/** @jsx jsx */
import React from "react"
import { Styled, jsx } from "theme-ui"
import Img from "gatsby-image"
import { Grid, Divider, Button, Card, Text } from "@theme-ui/components"
import { Layout, SEO, Link } from "../components"
import { useStaticQuery, graphql } from "gatsby"

const CartPage = () => {
  const {
    productImage: {
      childImageSharp: { fluid: productImageFluid },
    },
  } = useStaticQuery(graphql`
    query {
      productImage: file(relativePath: { eq: "product/down-jacket-blue.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 120) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const cartContents = [
    {
      image: productImageFluid,
      name: "Men's Down Jacket",
      price: 50,
      size: "Small",
      color: "Black",
    },
    {
      image: productImageFluid,
      name: "Women's Down Jacket",
      price: 60,
      size: "Medium",
      color: "Orange",
    },
  ]

  const Entry = ({ product }) => (
    <div
      sx={{
        display: "grid",
        gridGap: "15px",
        gridTemplateColumns: "120px 2fr 80px 80px",
        alignItems: "center",
      }}
    >
      <div>
        <div sx={{ padding: 1, border: "1px solid gray" }}>
          <Img fluid={productImageFluid} />
        </div>
      </div>
      <div>
        <Link url="/product" sx={{ fontSize: 3, m: 0, fontWeight: 700 }}>
          {product.name}
        </Link>
        <Styled.ul sx={{ mt: 2, mb: 0, padding: 0, listStyle: "none" }}>
          <li>
            <strong>Size: </strong>
            {product.size}
          </li>
          <li>
            <strong>Color: </strong>
            {product.color}
          </li>
        </Styled.ul>
      </div>
      <Button variant="link">Delete</Button>
      <Text
        sx={{
          fontSize: 4,
          fontWeight: 700,
          marginLeft: "auto",
        }}
      >
        ${product.price}
      </Text>
    </div>
  )

  const total = cartContents.reduce((value, cartItem) => {
    return cartItem.price + value
  }, 0)

  return (
    <Layout>
      <SEO title="Product Name" />
      <Styled.h1>Cart</Styled.h1>
      {cartContents.map(product => (
        <>
          <Entry product={product} />
          <Divider sx={{ my: 3 }} />
        </>
      ))}
      <div sx={{ display: "flex" }}>
        <Card sx={{ marginLeft: "auto", minWidth: "10rem", p: 4 }}>
          <Styled.h3 sx={{ mt: 0, mb: 3 }}>Cart Summary</Styled.h3>
          <Divider />

          <Grid gap={1} columns={2} sx={{ my: 3 }}>
            <Text>Subtotal:</Text>
            <Text sx={{ marginLeft: "auto" }}>${total}</Text>
            <Text>Shipping:</Text>
            <Text sx={{ marginLeft: "auto" }}> - </Text>
            <Text>Tax: </Text>
            <Text sx={{ marginLeft: "auto" }}> - </Text>
          </Grid>

          <Divider />
          <Grid gap={1} columns={2}>
            <Text variant="bold">Estimated Total:</Text>
            <Text variant="bold" sx={{ marginLeft: "auto" }}>
              ${total}
            </Text>
          </Grid>
          <Button sx={{ mt: 4, width: "100%" }}>Checkout</Button>
        </Card>
      </div>
    </Layout>
  )
}

export default CartPage
