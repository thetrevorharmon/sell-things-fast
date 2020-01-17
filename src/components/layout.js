/** @jsx jsx */
import { Styled, jsx } from "theme-ui"
import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "normalize.css"

import Header from "./header"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Styled.root>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        sx={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: 3,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <footer>
          <Styled.p>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </Styled.p>
        </footer>
      </div>
    </Styled.root>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
