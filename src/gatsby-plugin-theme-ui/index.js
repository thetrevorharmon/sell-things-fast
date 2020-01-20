import { base } from "@theme-ui/presets"
console.log({
  base,
})
export default {
  ...base,
  styles: {
    ...base.styles,
  },
  fontWeights: {
    medium: 600,
    bold: 800,
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
      fontWeight: medium,
      "&:hover": {
        bg: "gray",
        cursor: "pointer",
      },
    },
    secondary: {
      color: "background",
      bg: "secondary",
    },
  },
}
