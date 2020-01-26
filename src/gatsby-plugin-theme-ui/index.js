import { base } from "@theme-ui/presets"

export default {
  ...base,
  styles: {
    ...base.styles,
    a: {
      color: "black",
      "&:hover": {
        color: "gray",
        textDecoration: "underline",
      },
    },
    hr: {
      display: "block",
      height: "1px",
      border: 0,
      borderTop: "1px solid",
      borderColor: "gray",
      opacity: "0.3",
    },
  },
  fontWeights: {
    medium: 600,
    bold: 800,
  },
  text: {
    bold: {
      fontWeight: 600,
    },
  },
  alerts: {
    primary: {
      border: "1px solid",
      borderColor: "gray",
      color: "black",
      bg: "white",
      fontWeight: "normal",
    },
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      backgroundColor: "muted",
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "muted",
    },
  },
  buttons: {
    primary: {
      color: "background",
      bg: "black",
      fontWeight: 600,
      "&:hover": {
        bg: "gray",
        cursor: "pointer",
      },
    },
    secondary: {
      color: "background",
      bg: "secondary",
    },
    link: {
      color: "black",
      textDecoration: "underline",
      padding: 0,
      background: "transparent",
      "&:hover": {
        color: "gray",
        cursor: "pointer",
      },
    },
  },
}
