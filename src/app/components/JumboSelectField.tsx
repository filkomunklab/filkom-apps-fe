import { FieldHookConfig, useField } from "formik";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { Fragment } from "react";

type OtherProps = {
  options: { value: string; label: string }[];
};

const JumboSelectField = (
  props: OtherProps & SelectProps & FieldHookConfig<string>
) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <Fragment>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>{props.label}</InputLabel>
        <Select {...props} {...field} error={!!errorText}>
          {props.options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label === "None" ? <em>{option.label}</em> : option.label}
            </MenuItem>
          ))}
        </Select>
        {!props.disabled && (
          <FormHelperText style={{ color: "red" }}>{errorText}</FormHelperText>
        )}
      </FormControl>
    </Fragment>
  );
};

export default JumboSelectField;
