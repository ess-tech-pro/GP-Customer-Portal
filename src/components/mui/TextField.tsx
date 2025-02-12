import React from "react";
import { Controller, Control } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";

interface CustomTextFieldProps extends Omit<TextFieldProps, "name"> {
  name: string;
  control: Control<any>;
  rules?: object;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ name, control, rules, ...props }) => (
  <Controller
    name={name}
    control={control}
    defaultValue=""
    rules={rules}
    render={({ field, fieldState }) => (
      <TextField {...field} {...props} error={!!fieldState.error} helperText={fieldState.error?.message} />
    )}
  />
);

export default CustomTextField;
