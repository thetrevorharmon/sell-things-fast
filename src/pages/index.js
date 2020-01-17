/** @jsx jsx */
import React from "react"
import { Link } from "gatsby"
import { Styled, jsx } from "theme-ui"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Styled.h1>Hi people</Styled.h1>
    <Styled.p>Welcome to your new Gatsby site.</Styled.p>
    <Styled.p>Now go build something great.</Styled.p>
    <div sx={{ maxWidth: 300, marginBottom: [3] }}>
      <Image />
    </div>
    <Styled.p>
      <Link to="/page-2/">Go to page 2</Link>
    </Styled.p>
  </Layout>
)

export default IndexPage
