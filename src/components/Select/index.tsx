import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  disabledLabel?: boolean;
  label: string;
  value: string;
  options: Option[];
  onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
}

export default function CustomSelect({
  disabledLabel,
  label,
  value,
  options,
  onChange,
}: CustomSelectProps) {
  console.log(!disabledLabel, label);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        {disabledLabel !== true && <InputLabel>{label}</InputLabel>}
        <Select
          value={value}
          onChange={onChange}
          {...(disabledLabel !== true && {
            label: label,
          })}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
