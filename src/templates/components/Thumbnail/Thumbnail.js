/** @jsx jsx */
import { jsx } from "theme-ui"
import Img from "gatsby-image"

export const Thumbnail = ({ src, onClick }) => {
  return (
    <div
      sx={{
        cursor: "pointer",
        border: "1px solid gray",
        padding: 1,
      }}
    >
      <Img fluid={src.localFile.childImageSharp.fluid} onClick={onClick} />
    </div>
  )
}
