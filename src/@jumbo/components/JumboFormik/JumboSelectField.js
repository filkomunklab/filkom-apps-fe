import React from "react";
import { useField } from "formik";
import FormHelperText from "@mui/material/FormHelperText";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import Select from "@mui/material/Select";
import { FormControl, InputLabel, MenuItem } from "@mui/material";

const JumboSelectField = (props) => {
  const { theme } = useJumboTheme();
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <React.Fragment>
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
          <FormHelperText style={{ color: theme.palette.error.main }}>
            {errorText}
          </FormHelperText>
        )}
      </FormControl>
    </React.Fragment>
  );
};

export default JumboSelectField;
