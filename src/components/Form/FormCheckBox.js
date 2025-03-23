import { Controller } from "react-hook-form";
import {
  Checkbox,
  FormControlLabel
} from "@mui/material";

export default function FormCheckBox(props) {

  const {control, name, rules, errors, label} = props;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={false}
      render={({ field: { value, onChange, ...field } }) => (
        <FormControlLabel
          control={
            <Checkbox onChange={onChange} checked={value} {...field} />
          }
          error={!!errors[name]}
          helperText={errors[name] ? errors[name].message : ''}
          name={label}
        />
      )}
    />
  );
}