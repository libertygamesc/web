import { Controller } from "react-hook-form";
import {
    TextField,
} from "@mui/material";

export default function FormTextField(props) {

    const { control, name, rules, errors, label, disabled } = props;

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            defaultValue=""
            
            render={({ field }) => (
                <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    error={!!errors[name]}
                    disabled={disabled ? disabled : false}
                    helperText={errors[name] ? errors[name].message : ''}
                    label={label}
                >
                </TextField>
            )}
        />
    );
}