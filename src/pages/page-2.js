/** @jsx jsx */
import React from "react"
import { Styled, jsx } from "theme-ui"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <Styled.h1>Hi from the second page</Styled.h1>
    <Styled.p>Welcome to page 2</Styled.p>
    <Styled.p>
      <Link to="/">Go back to the homepage</Link>
    </Styled.p>
  </Layout>
)

export default SecondPage
