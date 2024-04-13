import { TextField, TextFieldProps } from "@mui/material";
import { FieldHookConfig, useField } from "formik";

//todo: to see how to define prop-types for this component

const JumboTextField = (props: FieldHookConfig<string> & TextFieldProps) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default JumboTextField;
