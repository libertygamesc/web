import { Controller } from "react-hook-form";
import {
    Autocomplete,
    TextField
} from "@mui/material";

export default function FormObjectComplete(props) {

    return (
        <Controller
            control={props.control}
            name={props.name}
            defaultValue={[props.options[0]]}
            render={({ field: { ref, onChange, ...field } }) => (
                <Autocomplete
                    multiple
                    options={props.options}
                    defaultValue={[props.options[0]]}
                    getOptionLabel={(option) => option.label}
                    onChange={(_, data) => onChange(data)}
                    renderInput={(params) => (
                        <TextField
                            {...field}
                            {...params}
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