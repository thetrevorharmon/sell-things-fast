/** @jsx jsx */
import { Styled, jsx } from "theme-ui"
import PropTypes from "prop-types"
import { Link } from "../components"
import { useCartCount } from "../context/StoreContext"

const Header = ({ siteTitle }) => {
  const count = useCartCount()

  const countMarkup = (
    <span
      sx={{
        display: "inline-block",
        background: "white",
        color: "black",
        height: "20px",
        lineHeight: "20px",
        width: "20px",
        fontSize: "0.8em",
        borderRadius: "10px",
        ml: 2,
        top: "-2px",
        position: "relative",
        textAlign: "center",
      }}
    >
      {count}
    </span>
  )

  return (
    <Styled.div as="header">
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
        <Styled.h1 sx={{ margin: 0, fontSize: 20, fontWeight: "bold" }}>
          <Link
            url="/"
            sx={{
              color: "black",
              letterSpacing: -0.5,
              textDecoration: `none`,
              paddingLeft: "20px",
              "&:hover": {
                textDecoration: "underline",
              },
              "&::before": {
                content: '"▼"',
                position: "absolute",
                marginLeft: "-20px",
              },
            }}
          >
            {siteTitle}
          </Link>
        </Styled.h1>
        <Link url="/cart" isButton>
          Cart
          {countMarkup}
        </Link>
      </div>
    </Styled.div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export { Header }
