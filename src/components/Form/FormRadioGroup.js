import { Controller } from "react-hook-form";
import {
  FormControlLabel,
  Radio,
  RadioGroup
} from "@mui/material";

export default function FormRadioGroup(props) {

  return (
    <Controller
      control={props.control}
      name={props.name}
      defaultValue=""
      render={({ field }) => (
        <RadioGroup row={props.row} {...field}>
          {props.options.map((option) => (
            <FormControlLabel
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      )}
    />
  );
}