import { Controller } from "react-hook-form";
import {
    Autocomplete,
    TextField
} from "@mui/material";

export default function FormAutoComplete(props) {

    return (
        <Controller
            control={control}
            name={props.name}
            defaultValue={props.options[0]}
            render={({ field: { ref, onChange, ...field } }) => (
                <Autocomplete
                    options={props.options}
                    onChange={(_, data) => onChange(data)}
                    defaultValue={props.options[0]}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            {...field}
                            fullWidth
                            inputRef={ref}
                            variant="outlined"
                            label={props.label}
                        />
                    )}
                />
            )}
        />
    );
}