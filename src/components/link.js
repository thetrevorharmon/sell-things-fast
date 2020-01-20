/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link as GatsbyLink } from "gatsby"
export const Link = ({ isButton, url, children, ...props }) => {
  return isButton ? (
    <GatsbyLink
      {...props}
      activeClassName="active"
      to={url}
      sx={{
        py: 2,
        px: 3,
        borderRadius: 4,
        textDecoration: "none",
        fontWeight: 600,
        background: "black",
        color: "white",
        textAlign: "center",
        "&:hover": {
          background: "gray",
        },
        "&.active": {
          background: "primary",
        },
      }}
    >
      {children}
    </GatsbyLink>
  ) : (
    <GatsbyLink
      {...props}
      activeClassName="active"
      to={url}
      sx={{
        color: "inherit",
        "&.active": {
          color: "primary",
        },
      }}
    >
      {children}
    </GatsbyLink>
  )
}
