import { FormControl, MenuItem, Select, SelectProps, FormHelperText } from "@mui/material";
import { Controller, Control, FieldError, Path } from "react-hook-form";

interface CustomSelectProps<T> extends Omit<SelectProps<T>, "error"> {
    name: Path<T>;
    control: Control<T>;
    options: { value: string | number; label: string }[];
    error?: FieldError;
    variant?: "filled" | "outlined" | "standard";
}

const CustomSelect = <T,>({
    name,
    control,
    options,
    error,
    variant = "outlined",
    ...rest
}: CustomSelectProps<T>) => {
    return (
        <FormControl fullWidth error={!!error}>
            <Controller
                name={name as Path<T>}
                control={control}
                render={({ field }) => (
                    <Select {...field} {...rest} variant={variant}>
                        {options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
            {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
    );
};

export default CustomSelect;
