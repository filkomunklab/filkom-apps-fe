import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CPL = [
  "CPL 1",
  "CPL 2",
  "CPL 3",
  "CPL 4",
  "CPL 5",
  "CPL 6",
  "CPL 7",
  "CPL 8",
  "CPL 9",
  "CPL 10",
];

function getStyles(CPL, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(CPL) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CPMKConfig = ({ id, onDeleteCpmk }) => {
  const theme = useTheme();
  const [cpl, setCpl] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCpl(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleDelete = (chipToDelete) => () => {
    setCpl((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  return (
    <div className="grid grid-cols-3 gap-4 border-b-2 mb-8 pb-5 relative">
      <div>
        <p className="mb-2">ID CPMK</p>
        <input
          type="text"
          className="border border-gray-300 p-2 w-full rounded-md h-14"
        />
      </div>

      <div>
        <p className="mb-2">Deskripsi</p>
        <textarea
          className="border border-gray-300 p-2 w-full rounded-md h-24"
          rows="4"
        ></textarea>
      </div>

      <div className="relative">
        <p className="mb-2">CPL yang di Dukung</p>
        <FormControl sx={{ width: "90%" }}>
          <Select
            className=""
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={cpl}
            onChange={handleChange}
            renderValue={(selected) => (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.5,
                }}
              >
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    onDelete={handleDelete(value)}
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {CPL.map((CPL) => (
              <MenuItem
                key={CPL}
                value={CPL}
                style={getStyles(CPL, cpl, theme)}
              >
                {CPL}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
        <DeleteIcon
          style={{ cursor: "pointer", color: "red" }}
          onClick={() => onDeleteCpmk(id)}
        />
      </div>
    </div>
  );
};

export default CPMKConfig;
