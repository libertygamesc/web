import { Controller } from "react-hook-form";
import {
    TextField,
    MenuItem
} from "@mui/material";
import { useLayout } from "providers/LayoutProvider";

export default function FormSelect(props) {

    const { control, name, rules, errors, label, options, defaultValue, handleChange } = props;
    const { mobile, getStringLanguage } = useLayout();


    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            defaultValue={defaultValue}
            render={({ field }) => (<>
                <TextField
                    {...field}
                    fullWidth
                    select
                    label={getStringLanguage(label)}
                    variant="outlined"
                    error={!!errors[name]}
                    helperText={errors[name] ? errors[name].message : ''}
                    onChange={(e) => {
                    field.onChange(e);
                    handleChange && handleChange(e);
                        // your method
                    }}
                >
                    {options.map((option) => (
                        <MenuItem value={option.value}>{option.label}</MenuItem>
                    ))}
                </TextField>
            </>
            )}
        />
    );
}