import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import { FC } from "react"

interface ISelectBlock {
  disabled?: boolean
  label: string
  value: string
  items: Array<string | number>
  handleChange: (event: SelectChangeEvent) => void
  error?: boolean
}
const SelectBlock: FC<ISelectBlock> = ({
  disabled,
  label,
  value,
  items,
  handleChange,
  error = false,
}): JSX.Element => {
  return (
    <FormControl className="select" error={error} disabled={disabled}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={handleChange}>
        {items.map((item: string | number, index: number) => {
          return (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default SelectBlock
