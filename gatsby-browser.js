import React from "react"
import { StoreContextProvider } from "./src/context/StoreContext"
export const wrapRootElement = ({ element }) => (
  <StoreContextProvider>{element}</StoreContextProvider>
)
