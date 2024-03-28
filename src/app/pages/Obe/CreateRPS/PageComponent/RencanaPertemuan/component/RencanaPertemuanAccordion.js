import React from "react";
import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

let Editor = () => <React.Fragment />;

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

const idCPMK = ["CPMK1", "CPMK2", "CPMK3", "CPMK4", "CPMK5", "CPMK6"];

function getStyles(idCPMK, CPMK, theme) {
  return {
    fontWeight:
      CPMK.indexOf(idCPMK) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const RencanaPertemuanAccordion = () => {
  const [minggu, setMinggu] = useState(1);
  const theme = useTheme();
  const [CPMK, setCPMK] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleChangeMinggu = (event) => {
    setMinggu(event.target.value);
  };

  const handleChangeCPMK = (event) => {
    const {
      target: { value },
    } = event;
    setCPMK(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    Editor = require("react-draft-wysiwyg").Editor;
    setEditorState(EditorState.createEmpty());
  }, []);

  return (
    <div className="my-2">
      <Accordion className="bg-primary">
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              style={{
                color: "white",
              }}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{
            backgroundColor: "#006AF5",
          }}
        >
          <h2 className="text-lg font-semibold w-full text-center text-white">
            Pertemuan 1
          </h2>
        </AccordionSummary>
        <AccordionDetails>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <p className="font-semibold mb-2">Minggu Ke-</p>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  value={minggu}
                  onChange={handleChangeMinggu}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>Minggu Ke-</em>
                  </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={11}>11</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={13}>13</MenuItem>
                  <MenuItem value={14}>14</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div>
              <p className="font-semibold mb-2">ID CPMK</p>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={CPMK}
                  onChange={handleChangeCPMK}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {idCPMK.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, CPMK, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="mb-5">
            <p className="font-semibold mb-2">Deskripsi SUB CPMK</p>
            <Editor
              editorStyle={{
                width: "100%",
                minHeight: 100,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "lightgray",
              }}
              editorState={editorState}
              onEditorStateChange={(editorState) => setEditorState(editorState)}
            />
          </div>
          <div className="mb-5">
            <p className="font-semibold mb-2">Indikator Ketercapaian CPMK</p>
            <Editor
              editorStyle={{
                width: "100%",
                minHeight: 100,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "lightgray",
              }}
              editorState={editorState}
              onEditorStateChange={(editorState) => setEditorState(editorState)}
            />
          </div>

          <div className="mb-5">
            <p className="font-semibold mb-2">Bentuk Assessmen</p>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Ex.Kuis, Case Study"
            />
          </div>

          <div className="mb-5">
            <p className="font-semibold mb-2">Materi</p>
            <Editor
              editorStyle={{
                width: "100%",
                minHeight: 100,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "lightgray",
              }}
              editorState={editorState}
              onEditorStateChange={(editorState) => setEditorState(editorState)}
            />
          </div>
          <div className="mb-5">
            <p className="font-semibold mb-2">Metode</p>
            <Editor
              editorStyle={{
                width: "100%",
                minHeight: 100,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "lightgray",
              }}
              editorState={editorState}
              onEditorStateChange={(editorState) => setEditorState(editorState)}
            />
          </div>
          <div className="mb-5">
            <p className="font-semibold mb-2">Luar Jaringan (Tatap Muka)</p>
            <Editor
              editorStyle={{
                width: "100%",
                minHeight: 100,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "lightgray",
              }}
              editorState={editorState}
              onEditorStateChange={(editorState) => setEditorState(editorState)}
            />
          </div>
          <div className="mb-5">
            <p className="font-semibold mb-2">Dalam Jaringan (Daring)</p>
            <Editor
              editorStyle={{
                width: "100%",
                minHeight: 100,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "lightgray",
              }}
              editorState={editorState}
              onEditorStateChange={(editorState) => setEditorState(editorState)}
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default RencanaPertemuanAccordion;
