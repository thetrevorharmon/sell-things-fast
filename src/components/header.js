/** @jsx jsx */
import { Styled, jsx } from "theme-ui"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Button } from "@theme-ui/components"

const Header = ({ siteTitle }) => (
  <Styled.div
    as="header"
    sx={
      {
        // marginBottom: 4,
      }
    }
  >
    <div
      sx={{
        margin: `0 auto`,
        maxWidth: 960,
        py: 4,
        px: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Styled.h1 sx={{ margin: 0, fontSize: 20, fontWeight: bold }}>
        <Link
          to="/"
          sx={{
            color: "black",
            letterSpacing: -0.5,
            textDecoration: `none`,
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {siteTitle}
        </Link>
      </Styled.h1>
      <Button>Cart</Button>
    </div>
  </Styled.div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export { Header }
