/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const Hero = ({ title, description }) => {
  const {
    heroImage: {
      childImageSharp: { fluid: heroImageSrc },
    },
  } = useStaticQuery(graphql`
    query {
      heroImage: file(relativePath: { eq: "hero.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  const titleBox = (
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "3px solid",
        color: "white",
        background: "rgba(0,0,0,0.40)",
        px: 5,
        py: 4,
        textAlign: "center",
        lineHeight: 1,
      }}
    >
      <span
        sx={{
          fontSize: 40,
          fontWeight: "800",
          textTransform: "uppercase",
        }}
      >
        {title}
      </span>
      <span sx={{ fontSize: 24, fontWeight: "500", mt: 2 }}>{description}</span>
    </div>
  )

  return (
    <div
      sx={{
        maxHeight: "35rem",
        overflow: "hidden",
        background: "red",
        position: "relative",
      }}
    >
      <div
        sx={{
          position: "absolute",
          zIndex: "10",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {titleBox}
        </div>
      </div>
      <Img
        imgStyle={{ height: "100%", width: "100%" }}
        objectFit="contain"
        fluid={heroImageSrc}
      />
    </div>
  )
}

Hero.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

Hero.defaultProps = {
  title: "Only Down",
  description: "Get down with Down",
}

export { Hero }
