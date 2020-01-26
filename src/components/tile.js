/** @jsx jsx */
import { Styled, jsx } from "theme-ui"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import { Card, Text } from "@theme-ui/components"
import { Link } from "../components"

const Tile = ({ title, slug, price, image }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "placeholder/shoe.png" }) {
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  const imageSrc = image ? image : data.placeholderImage.childImageSharp.fluid

  return (
    <Card
      sx={{
        maxWidth: 290,
        p: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div sx={{ position: "relative" }}>
        <Img fluid={imageSrc} />
      </div>
      <Styled.h2 sx={{ mt: 4, mb: 0, fontSize: 3 }}>{title}</Styled.h2>
      <Text sx={{ fontSize: 4, mb: 2 }}>${price.toFixed(2)}</Text>
      <Link url={`/product/${slug}`} isButton>
        View
      </Link>
    </Card>
  )
}

Tile.propTypes = {
  title: PropTypes.string,
  slug: PropTypes.string,
  price: PropTypes.number,
}

Tile.defaultProps = {
  title: "Men's Down Jacket",
  price: "50",
}

export { Tile }
