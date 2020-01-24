/** @jsx jsx */
import { jsx } from "theme-ui"
import { Select, Label } from "@theme-ui/components"

export const OptionPicker = ({ name, options, onChange, selected }) => {
  return (
    <div>
      <Label>{name}</Label>
      <Select onChange={onChange} value={selected}>
        {options.map(option => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  )
}
