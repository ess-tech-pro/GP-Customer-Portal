import React from "react";
import { Controller, Control, FieldValues } from "react-hook-form";
import type { TextFieldProps } from "@mui/material/TextField";
import CustomTextField from "./TextField";

interface CustomTextFieldWithValidationProps
  extends Omit<TextFieldProps, "name" | "control" | "rules"> {
  name: string;
  control: Control<FieldValues>;
  rules?: Record<string, unknown>; // Ensures proper rules typing
}

const CustomTextFieldWithValidation: React.FC<CustomTextFieldWithValidationProps> = ({
  name,
  control,
  rules,
  variant = "filled",
  ...props
}) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field: { ref, ...field }, fieldState: { error } }) => (
      <CustomTextField
        {...field}
        {...props}
        inputRef={ref}
        variant={variant}
        error={Boolean(error)}
        helperText={error?.message}
      />
    )}
  />
);

export default CustomTextFieldWithValidation;
