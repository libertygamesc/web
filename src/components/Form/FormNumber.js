import { Controller } from "react-hook-form";
import {
    TextField,
} from "@mui/material";

export default function FormNumber(props) {

    const { control, name, rules, errors, label, onChange, readOnly } = props;

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
                    type="number"
                    variant="outlined"
                    error={!!errors[name]}
                    helperText={errors[name] ? errors[name].message : ''}
                    label={label}
                    onChange={onChange}
                    InputProps={{readOnly}}
                >
                </TextField>
            )}
        />
    );
}