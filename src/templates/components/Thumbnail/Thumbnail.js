/** @jsx jsx */
import { jsx } from "theme-ui"
import Img from "gatsby-image"

export const Thumbnail = ({ src, onClick }) => {
  return (
    <button
      sx={{
        cursor: "pointer",
        border: "1px solid gray",
        padding: 1,
        "&:focus": {
          outline: "none",
          borderColor: "black",
        },
      }}
      onClick={onClick}
    >
      <Img fluid={src.localFile.childImageSharp.fluid} />
    </button>
  )
}
