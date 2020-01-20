/** @jsx jsx */
import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { Styled, jsx } from "theme-ui"

import { Layout, Image, SEO, Tile } from "../components"
import { useStaticQuery, graphql } from "gatsby"

const IndexPage = () => {
  return (
    <Layout hasHero>
      <SEO title="Home" />
      <Styled.h1>Hi people</Styled.h1>
      <Tile>HI WORLD</Tile>

      <div sx={{ maxWidth: 300, marginBottom: [3] }}></div>
      <Styled.p>
        <Link to="/page-2/">Go to page 2</Link>
      </Styled.p>
    </Layout>
  )
}

export default IndexPage
