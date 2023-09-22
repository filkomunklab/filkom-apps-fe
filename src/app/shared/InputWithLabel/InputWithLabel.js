import React from "react";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import {
  Autocomplete,
  Button,
  ButtonBase,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { Stack } from "@mui/system";
import Div from "@jumbo/shared/Div";
import { useField } from "formik";
import { processDropdownOption } from "app/utils/appHelpers";
import InfoIcon from "@mui/icons-material/Error";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  customTooltip: {
    backgroundColor: "#B1C5F6",
    color: "black",
  },
}));

const InputWithLabel = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  const classes = useStyles();

  const [currencyValues, setCurrencyValues] = React.useState(1320);

  const {
    title,
    type,
    options,
    fileName,
    fileInputRef,
    onBrowse,
    onChange,
    info,
    onClick,
    centeredtitle,
  } = props;
  if (type === "dropdown") {
    return (
      <>
        <FormControl fullWidth sx={{ pt: 1, gap: 1 }}>
          {title && <Typography>{title}&nbsp;</Typography>}
          {centeredtitle && (
            <Typography sx={{ textAlign: "center" }}>
              {centeredtitle}&nbsp;
            </Typography>
          )}
          <Select
            displayEmpty
            defaultValue=""
            error={!!errorText}
            aria-describedby={`${title}-error-text`}
            {...props}
            {...field}
          >
            <MenuItem value="">
              <em>{props.placeholder}</em>
            </MenuItem>
            {options?.map((option, i) => {
              return (
                <MenuItem key={i} value={option.value}>
                  {option.label}
                </MenuItem>
              );
            })}
          </Select>

          {info && (
            <Typography variant="p" color={"text.info"}>
              {info}
            </Typography>
          )}
          <FormHelperText
            sx={{ color: "error.main" }}
            id={`${title}-error-text`}
          >
            {errorText}
          </FormHelperText>
        </FormControl>
      </>
    );
  }

  if (type === "radio") {
    return (
      <>
        <FormControl fullWidth sx={{ pt: 1, gap: 1 }}>
          <Typography
            sx={{ fontFamily: "normal", fontWeight: "700", color: "#0A0A0A" }}
          >
            {title}
          </Typography>
          <RadioGroup {...props} {...field}>
            {!props.wrap ? (
              options.map((option, i) => (
                <Div key={i} sx={{ ...props.custom }}>
                  <FormControlLabel
                    key={i}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                  {option.textField === true ? (
                    <TextField
                      variant={props.variant}
                      inputProps={{
                        style: { height: "8px" },
                      }}
                      placeholder={option.textFieldPlaceholder}
                      name={option.textFieldName}
                      disabled={props.disabled}
                    />
                  ) : null}
                </Div>
              ))
            ) : (
              <Grid>
                <RadioGroup
                  {...props}
                  {...field}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    height: "60%",
                  }}
                >
                  {options.map((option, i) => (
                    <FormControlLabel
                      key={i}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              </Grid>
            )}
          </RadioGroup>
        </FormControl>
        <FormHelperText sx={{ color: "error.main" }} id={`${title}-error-text`}>
          {errorText}
        </FormHelperText>
      </>
    );
  }

  if (type === "checkbox") {
    return (
      <>
        {title && <Typography>{title}</Typography>}
        <FormGroup
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            gap: 30,
          }}
        >
          {options.map((x, i) => {
            return (
              <Div key={i}>
                <FormControlLabel
                  key={i}
                  control={<Checkbox />}
                  label={x.label}
                  checked={x.isChecked && x.isChecked}
                />
              </Div>
            );
          })}
        </FormGroup>
      </>
    );
  }
  if (type === "checkbox-with-textfield") {
    return (
      <>
        {title && <Typography>{title}</Typography>}
        <FormGroup
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {options.map((option, i) => (
            <Div key={i} sx={{ ...props.custom }}>
              <FormControlLabel
                key={i}
                value={option.value}
                control={<Checkbox checked={option.checked} />}
                label={option.label}
              />
              {option.textField === true ? (
                <TextField
                  variant={props.variant}
                  inputProps={{
                    style: { height: "8px" },
                  }}
                  placeholder={option.textFieldPlaceholder}
                  name={option.textFieldName}
                  disabled={props.disabled}
                />
              ) : null}
            </Div>
          ))}
        </FormGroup>
      </>
    );
  }

  if (type === "radio-with-view") {
    return (
      <>
        <FormControl fullWidth sx={{ pt: 1, gap: 1 }}>
          <Typography>{title}</Typography>
          <RadioGroup {...props} {...field}>
            {!props.wrap ? (
              options.map((option, i) => (
                <Stack
                  direction="row"
                  alignItems="center"
                  key={i}
                  sx={{ ...props.custom }}
                >
                  <FormControlLabel
                    key={i}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />

                  {props.selectedvalue === option.value && option.view && (
                    <ButtonBase
                      onClick={props.onclickview}
                      sx={{ color: "info.main" }}
                    >
                      View
                    </ButtonBase>
                  )}

                  {option.textField === true ? (
                    <TextField
                      variant={props.variant}
                      inputProps={{
                        style: { height: "8px" },
                      }}
                      placeholder={option.textFieldPlaceholder}
                      name={option.textFieldName}
                      InputProps={{ readOnly: props.readOnly }}
                      disabled={props.disabled}
                      value={option.value}
                    />
                  ) : null}
                </Stack>
              ))
            ) : (
              <Grid>
                <RadioGroup
                  {...props}
                  {...field}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    height: "60%",
                  }}
                >
                  {options.map((option, i) => (
                    <FormControlLabel
                      key={i}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              </Grid>
            )}
          </RadioGroup>
        </FormControl>
      </>
    );
  }

  if (type === "date-picker") {
    return (
      <>
        <FormControl fullWidth sx={{ pt: 1, gap: 1 }}>
          {title && <Typography>{title}</Typography>}
          <DatePicker
            slotProps={{
              textField: {
                helperText: errorText,
                error: !!errorText,
              },
            }}
            {...props}
          />
        </FormControl>
      </>
    );
  }

  if (type === "date-picker-left-label") {
    return (
      <>
        <FormControl fullWidth sx={{ pt: 1, gap: 1 }}>
          <Stack direction="row" alignItems="center" gap={1}>
            {title && <Typography>{title}</Typography>}
            <DatePicker
              sx={{
                "& .MuiInputBase-root": {
                  height: "40px",
                },
              }}
              {...props}
            />
          </Stack>
        </FormControl>
      </>
    );
  }
  if (type === "datetime-picker") {
    return (
      <>
        <FormControl fullWidth sx={{ pt: 1, gap: 1 }}>
          {title && <Typography>{title}</Typography>}
          <DateTimePicker {...props} />
        </FormControl>
      </>
    );
  }

  if (type === "left-label") {
    return (
      <>
        <FormControl
          fullWidth
          sx={{
            pt: 1,
            gap: 1,
            alignItems: "flex-end",
          }}
        >
          <Stack direction="row" alignItems="center" gap={2}>
            <Typography>{title}</Typography>
            <TextField
              onChange={onChange}
              helperText={errorText}
              error={!!errorText}
              {...field}
              {...props}
            />
          </Stack>
        </FormControl>
        <Stack direction="row" justifyContent={"flex-end"} color={"red"}>
          <Typography>{errorText}</Typography>
        </Stack>
      </>
    );
  }
  if (type === "bottom-label") {
    return (
      <>
        <FormControl
          // fullWidth
          sx={{
            pt: 1,
            gap: 1,
          }}
        >
          <Stack gap={2}>
            <TextField
              onChange={onChange}
              helperText={errorText}
              error={!!errorText}
              {...field}
              {...props}
            />
            <Typography>{title}</Typography>
          </Stack>
        </FormControl>
        <Stack direction="row" justifyContent={"flex-end"} color={"red"}>
          <Typography>{errorText}</Typography>
        </Stack>
      </>
    );
  }
  if (type === "dropdown-left-label") {
    return (
      <>
        <FormControl fullWidth sx={{ pt: 1, gap: 1 }}>
          <Stack direction="row" alignItems="center" gap={2}>
            {title && <Typography>{title}&nbsp;</Typography>}
            <Select displayEmpty {...props} {...field}>
              <MenuItem value="">
                <em>{props.placeholder}</em>
              </MenuItem>
              {options.map((option, i) => (
                <MenuItem key={i} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {info && (
              <Typography variant="p" color={"text.info"}>
                {info}
              </Typography>
            )}
          </Stack>
        </FormControl>
      </>
    );
  }

  if (type === "file") {
    return (
      <Div sx={{ marginBottom: "24px" }}>
        <Typography
          sx={{
            fontFamily: "normal",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "24px",
            marginBottom: "12px",
          }}
        >
          {title}
        </Typography>
        <FormControl sx={{ minWidth: 80, width: "100%", position: "relative" }}>
          <TextField
            {...field}
            placeholder={props.placeholder}
            disabled
            label={fileName}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      marginRight: "16px",
                      backgroundColor: "white",
                      padding: "8px 12px",
                      borderRadius: "60px",
                      fontFamily: "normal",
                      color: "#757575",
                      textTransform: "capitalize",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                    onChange={onBrowse}
                  >
                    Browse
                    <input
                      type="file"
                      //   accept=".pdf"
                      ref={fileInputRef}
                      hidden
                      onChange={onChange}
                    />
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Div>
    );
  }

  // if (type === "sort") {
  //   return (
  //     <>
  //       <FormControl fullWidth sx={{ pt: 1, gap: 1 }}>
  //         <Select
  //           displayEmpty
  //           {...props}
  //           input={
  //             <Input
  //               startAdornment={
  //                 <InputAdornment position="start">
  //                   <FilterListIcon />
  //                 </InputAdornment>
  //               }
  //             />
  //           }
  //         >
  //           <MenuItem value="">
  //             <em>{props.placeholder}</em>
  //           </MenuItem>
  //           {options.map((option, i) => (
  //             <MenuItem key={i} value={option.value}>
  //               {option.label}
  //             </MenuItem>
  //           ))}
  //         </Select>
  //       </FormControl>
  //     </>
  //   );
  // }

  if (type === "sort") {
    return (
      <FormControl fullWidth>
        <Select
          {...props}
          {...field}
          IconComponent={FilterListIcon}
          displayEmpty
          sx={{
            borderRadius: "60px",
            height: "42px",
            "& .MuiSvgIcon-root": {
              right: "unset",
              left: "12px",
            },
            paddingLeft: "28px",
          }}
          value=""
        >
          <MenuItem value="">
            <em>Sort By</em>
          </MenuItem>
          {options.map((options, i) => (
            <MenuItem key={i} value={options.value}>
              {options.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  if (type === "autocomplete") {
    return (
      <>
        <FormControl fullWidth sx={{ pt: 1, gap: 1 }}>
          <Typography>{title}&nbsp;</Typography>
          <Autocomplete
            disablePortal
            getOptionLabel={(option) => option.label}
            options={options}
            renderInput={(params) => (
              <TextField {...params} placeholder={props.placeholder} />
            )}
            {...props}
            {...field}
          />
          {info && (
            <Typography variant="p" color={"text.info"}>
              {info}
            </Typography>
          )}
        </FormControl>
      </>
    );
  }

  if (type === "search") {
    return (
      <>
        <FormControl fullWidth sx={{ pt: 1, gap: 1 }}>
          {title && <Typography>{title}&nbsp;</Typography>}
          <TextField
            {...props}
            {...field}
            InputProps={{
              startAdornment: (
                <IconButton sx={{ padding: "0px" }} onClick={() => {}}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          {info && (
            <Typography variant="p" color={"text.info"}>
              {info}
            </Typography>
          )}
        </FormControl>
      </>
    );
  }

  if (type === "leftSearch") {
    return (
      <>
        <FormControl fullWidth sx={{ pt: 1, gap: 1 }}>
          {title && (
            <Typography sx={{ whiteSpace: "nowrap" }}>{title}</Typography>
          )}

          <TextField
            {...props}
            {...field}
            InputProps={{
              startAdornment: (
                <IconButton
                  sx={{ padding: "0px", marginRight: 2 }}
                  onClick={onClick}
                >
                  <SearchIcon sx={{ color: "#9E9E9E" }} />
                </IconButton>
              ),
            }}
          />
        </FormControl>
      </>
    );
  }

  if (type === "searchTopLabel") {
    return (
      <>
        <FormControl fullWidth sx={{ pt: 1, gap: 1 }}>
          {title && <Typography>{title}&nbsp;</Typography>}
          <TextField
            helperText={errorText}
            error={!!errorText}
            {...props}
            InputProps={{
              readOnly: props.readOnly,
              placeholder: props.placeholder,
              endAdornment: (
                <IconButton sx={{ padding: "0px" }} onClick={props.search}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          {info && (
            <Typography variant="p" color={"text.info"}>
              {info}
            </Typography>
          )}
        </FormControl>
      </>
    );
  }

  if (type === "searchLeftLabel") {
    return (
      <>
        <Stack direction="row" sx={{ alignItems: "center" }} gap={2}>
          {title && (
            <Typography sx={{ whiteSpace: "nowrap" }}>{title}</Typography>
          )}
          <FormControl fullWidth sx={{ pt: 1, gap: 1 }}>
            <TextField
              sx={{ maxWidth: "100px" }}
              {...props}
              InputProps={{
                endAdornment: (
                  <IconButton sx={{ padding: "0px" }} onClick={() => {}}>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </FormControl>
          {props.checkboxtitle && (
            <FormControlLabel
              control={<Checkbox />}
              labelPlacement="end"
              label={props.checkboxtitle}
            />
          )}
          {info && (
            <Typography variant="p" color={"text.info"}>
              {info}
            </Typography>
          )}
        </Stack>
      </>
    );
  }

  if (type === "radiology") {
    return (
      <>
        <FormControl
          // fullWidth
          sx={{ pt: 1, gap: 1, alignItems: "center" }}
        >
          {title && (
            <Typography
              sx={{ fontFamily: "normal", fontWeight: "700", fontSize: "14px" }}
            >
              {title}
            </Typography>
          )}
          <TextField
            {...props}
            {...field}
            variant="outlined"
            helperText={errorText}
            error={!!errorText}
            sx={{
              flex: "0 0 auto",
              width: 60,
            }}
          />
        </FormControl>
      </>
    );
  }

  if (type === "centeredLabel") {
    return (
      <>
        <FormControl fullWidth sx={{ pt: 1, gap: 1 }}>
          <Typography sx={{ textAlign: "center" }}>{title}</Typography>
          <TextField
            {...props}
            {...field}
            helperText={errorText}
            error={!!errorText}
          />
        </FormControl>
      </>
    );
  }

  if (type === "double") {
    return (
      <>
        <Stack direction="row" alignItems="center">
          <Div sx={{ marginTop: title ? 0 : 2.5 }}>
            <Typography>{title}</Typography>
            <TextField
              value={props.inputLabel}
              InputProps={{
                readOnly: true,
              }}
            />
          </Div>
          <Div sx={{ marginTop: title ? 1.6 : 1.5, marginLeft: -8 }}>
            <FormControl fullWidth sx={{ pt: 1, gap: 1 }}>
              <TextField
                InputProps={{
                  readOnly: true,
                  style: {
                    backgroundColor: "#f0f0f0",
                    border: "none",
                  },
                }}
                helperText={errorText}
                error={!!errorText}
                {...field}
                {...props}
              />
            </FormControl>
          </Div>
        </Stack>
      </>
    );
  }

  if (type === "double-with-info") {
    return (
      <>
        <Stack direction="row" alignItems="center" width="100%">
          <FormControl
            fullWidth
            sx={{ marginTop: title ? 0 : 2.5, marginRight: -0.5 }}
          >
            <Typography>{title && title}</Typography>
            <TextField
              value={`  ${props.inputLabel}`}
              InputProps={{
                startAdornment: (
                  <Tooltip
                    classes={{ tooltip: classes.customTooltip }}
                    title={props.tooltip}
                    arrow
                    placement="top"
                  >
                    <InfoIcon sx={{ color: "#989898" }} />
                  </Tooltip>
                ),
                readOnly: true,
                style: {
                  backgroundColor: "#f0f0f0",
                  border: "none",
                },
              }}
            />
          </FormControl>

          <FormControl fullWidth sx={{ marginTop: 2.5 }}>
            <TextField
              InputProps={{
                style: {
                  backgroundColor: "#FFF",
                },
              }}
              helperText={errorText}
              error={!!errorText}
              {...field}
              {...props}
            />
          </FormControl>
        </Stack>
      </>
    );
  }

  return (
    <>
      <FormControl fullWidth sx={{ pt: 1, gap: 1 }}>
        {title && <Typography>{title}</Typography>}
        <TextField
          helperText={errorText}
          error={!!errorText}
          {...field}
          {...props}
        />
      </FormControl>
    </>
  );
};

export default InputWithLabel;
