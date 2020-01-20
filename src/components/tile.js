/** @jsx jsx */
import { Styled, jsx } from "theme-ui"
import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Card, Text } from "@theme-ui/components"
import Image from "./image"

const Tile = ({ children }) => {
  return (
    <Card
      sx={{
        maxWidth: 256,
      }}
    >
      <Image />
      <Text>{children}</Text>
    </Card>
  )
}

Tile.propTypes = {
  children: PropTypes.node.isRequired,
}

export { Tile }
