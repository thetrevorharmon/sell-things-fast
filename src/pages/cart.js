/** @jsx jsx */
import React from "react"
import { Styled, jsx } from "theme-ui"
import Img from "gatsby-image"
import { Grid, Divider, Button, Card, Text } from "@theme-ui/components"
import { Layout, SEO, Link } from "../components"
import { useStaticQuery, graphql } from "gatsby"
import {
  useCartItems,
  useCartTotals,
  useAddItemToCart,
  useRemoveItemFromCart,
  useCheckout,
} from "../context/StoreContext"

const CartPage = () => {
  const {
    allShopifyProductVariant: { nodes: variants },
    allShopifyProduct: { nodes: products },
  } = useStaticQuery(graphql`
    query {
      allShopifyProductVariant {
        nodes {
          shopifyId
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 120) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
      allShopifyProduct {
        nodes {
          handle
          variants {
            shopifyId
          }
        }
      }
    }
  `)

  const lineItems = useCartItems()
  const { tax, total } = useCartTotals()
  const removeFromCart = useRemoveItemFromCart()
  const checkout = useCheckout()
  const addItemToCart = useAddItemToCart()

  const betterProductHandles = products.map(({ handle, variants }) => {
    const newVariants = variants.map(variant => variant.shopifyId)
    return {
      variants: newVariants,
      handle,
    }
  })

  function getHandleForVariant(variantId) {
    const selectedProduct = betterProductHandles.find(product => {
      return product.variants.includes(variantId)
    })

    return selectedProduct ? selectedProduct.handle : null
  }

  function getImageFluidForVariant(variantId) {
    const selectedVariant = variants.find(variant => {
      return variant.shopifyId === variantId
    })

    if (selectedVariant) {
      return selectedVariant.image.localFile.childImageSharp.fluid
    }
    return null
  }

  const LineItem = ({ item }) => (
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
          <Img fluid={getImageFluidForVariant(item.variant.id)} />
        </div>
      </div>
      <div>
        <Link
          url={`/product/${getHandleForVariant(item.variant.id)}`}
          sx={{ fontSize: 3, m: 0, fontWeight: 700 }}
        >
          {item.title}
        </Link>
        <Styled.ul sx={{ mt: 2, mb: 0, padding: 0, listStyle: "none" }}>
          {item.variant.selectedOptions.map(({ name, value }) => (
            <li key={name}>
              <strong>{name}: </strong>
              {value}
            </li>
          ))}
          <li key="quantity">
            <strong>Quantity: </strong>
            {item.quantity}
          </li>
        </Styled.ul>
      </div>
      <Button variant="link" onClick={() => removeFromCart(item.id)}>
        Delete
      </Button>
      <Text
        sx={{
          fontSize: 4,
          fontWeight: 700,
          marginLeft: "auto",
        }}
      >
        ${Number(item.variant.priceV2.amount).toFixed(2)}
      </Text>
    </div>
  )

  const emptyCart = (
    <Layout>
      <SEO title="Cart" />
      <Styled.h1>Cart</Styled.h1>
      <Styled.p>Your shopping cart is empty.</Styled.p>
      <Button
        sx={{ mt: 4 }}
        onClick={() =>
          addItemToCart(
            variants[Math.floor(Math.random() * (variants.length - 1))]
              .shopifyId,
            1
          )
        }
      >
        <span role="img" aria-label="Dice Emoji">
          🎲
        </span>{" "}
        Random item plz
      </Button>
    </Layout>
  )

  return lineItems.length < 1 ? (
    emptyCart
  ) : (
    <Layout>
      <SEO title="Cart" />
      <Styled.h1>Cart</Styled.h1>
      {lineItems.map(item => (
        <React.Fragment key={item.id}>
          <LineItem key={item.id} item={item} />
          <Divider sx={{ my: 3 }} />
        </React.Fragment>
      ))}
      <div sx={{ display: "flex" }}>
        <Card sx={{ marginLeft: "auto", minWidth: "10rem", p: 4 }}>
          <Styled.h3 sx={{ mt: 0, mb: 3 }}>Cart Summary</Styled.h3>
          <Divider />

          <Grid gap={1} columns={2} sx={{ my: 3 }}>
            <Text>Subtotal:</Text>
            <Text sx={{ marginLeft: "auto" }}>{total}</Text>
            <Text>Shipping:</Text>
            <Text sx={{ marginLeft: "auto" }}> - </Text>
            <Text>Tax: </Text>
            <Text sx={{ marginLeft: "auto" }}>{tax}</Text>
          </Grid>

          <Divider />
          <Grid gap={1} columns={2}>
            <Text variant="bold">Estimated Total:</Text>
            <Text variant="bold" sx={{ marginLeft: "auto" }}>
              {total}
            </Text>
          </Grid>
          <Button sx={{ mt: 4, width: "100%" }} onClick={checkout}>
            Checkout
          </Button>
        </Card>
      </div>
    </Layout>
  )
}

export default CartPage
