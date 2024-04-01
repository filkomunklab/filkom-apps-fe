import { Fragment } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import { Field, FieldArray, useFormikContext } from "formik";
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

const RencanaPertemuan = () => {
  const { setFieldValue, values, errors } = useFormikContext();

  console.log(values, errors);

  return (
    <div className="bg-white rounded-sm p-5">
      <h1 className="text-lg font-semibold mb-10">Rencana Pertemuan</h1>

      <FieldArray
        name="meetingPlan"
        render={(arrayHelpers) => (
          <Fragment>
            {values.meetingPlan.map((item, index) => (
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
                      Pertemuan Ke-{index + 1}
                    </h2>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <div>
                        <p className="font-semibold mb-2">Minggu Ke-</p>
                        <Field
                          name={`meetingPlan[${index}].week`}
                          type="text"
                          className="w-full border border-gray-400 rounded-md p-2 py-[15px] hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
                          placeholder="Ex. 1"
                        />
                        <FormHelperText error>
                          <b>{errors.meetingPlan?.[index]?.week}</b>
                        </FormHelperText>
                      </div>

                      <div>
                        <p className="font-semibold mb-2">ID CPMK</p>
                        <FormControl sx={{ width: "100%" }}>
                          <Field name={`meetingPlan[${index}].cpmkList`}>
                            {({ field }) => (
                              <Select
                                {...field}
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                MenuProps={MenuProps}
                              >
                                {values.cpmk.map((item, index) => (
                                  <MenuItem key={index} value={item.code}>
                                    {item.code}
                                  </MenuItem>
                                ))}
                              </Select>
                            )}
                          </Field>
                          <FormHelperText error>
                            <b>{errors.meetingPlan?.[index]?.cpmkList}</b>
                          </FormHelperText>
                        </FormControl>
                      </div>
                    </div>

                    <div className="mb-5">
                      <p className="font-semibold mb-2">Deskripsi SUB CPMK</p>
                      <Editor
                        editorStyle={styles.editorStyle}
                        onEditorStateChange={(editorState) =>
                          setFieldValue(
                            `meetingPlan[${index}].subCpmkDescription`,
                            draftToHtml(
                              convertToRaw(editorState.getCurrentContent())
                            )
                          )
                        }
                      />
                      <FormHelperText error>
                        <b>{errors.meetingPlan?.[index]?.subCpmkDescription}</b>
                      </FormHelperText>
                    </div>
                    <div className="mb-5">
                      <p className="font-semibold mb-2">
                        Indikator Ketercapaian CPMK
                      </p>
                      <Editor
                        editorStyle={styles.editorStyle}
                        onEditorStateChange={(editorState) =>
                          setFieldValue(
                            `meetingPlan[${index}].achievementIndicators`,
                            draftToHtml(
                              convertToRaw(editorState.getCurrentContent())
                            )
                          )
                        }
                      />
                      <FormHelperText error>
                        <b>
                          {errors.meetingPlan?.[index]?.achievementIndicators}
                        </b>
                      </FormHelperText>
                    </div>

                    <div className="mb-5">
                      <p className="font-semibold mb-2">Bentuk Assessmen</p>
                      <Field
                        name={`meetingPlan[${index}].assessmentModel`}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Ex.Kuis, Case Study"
                      />
                      <FormHelperText error>
                        <b>{errors.meetingPlan?.[index]?.assessmentModel}</b>
                      </FormHelperText>
                    </div>

                    <div className="mb-5">
                      <p className="font-semibold mb-2">Materi</p>
                      <Editor
                        editorStyle={styles.editorStyle}
                        onEditorStateChange={(editorState) =>
                          setFieldValue(
                            `meetingPlan[${index}].material`,
                            draftToHtml(
                              convertToRaw(editorState.getCurrentContent())
                            )
                          )
                        }
                      />
                      <FormHelperText error>
                        <b>{errors.meetingPlan?.[index]?.material}</b>
                      </FormHelperText>
                    </div>
                    <div className="mb-5">
                      <p className="font-semibold mb-2">Metode</p>
                      <Editor
                        editorStyle={styles.editorStyle}
                        onEditorStateChange={(editorState) =>
                          setFieldValue(
                            `meetingPlan[${index}].method`,
                            draftToHtml(
                              convertToRaw(editorState.getCurrentContent())
                            )
                          )
                        }
                      />
                      <FormHelperText error>
                        <b>{errors.meetingPlan?.[index]?.method}</b>
                      </FormHelperText>
                    </div>
                    <div className="mb-5">
                      <p className="font-semibold mb-2">
                        Luar Jaringan (Tatap Muka)
                      </p>
                      <Editor
                        editorStyle={styles.editorStyle}
                        onEditorStateChange={(editorState) =>
                          setFieldValue(
                            `meetingPlan[${index}].offlineActivity`,
                            draftToHtml(
                              convertToRaw(editorState.getCurrentContent())
                            )
                          )
                        }
                      />
                      <FormHelperText error>
                        <b>{errors.meetingPlan?.[index]?.offlineActivity}</b>
                      </FormHelperText>
                    </div>
                    <div className="mb-5">
                      <p className="font-semibold mb-2">
                        Dalam Jaringan (Daring)
                      </p>
                      <Editor
                        editorStyle={styles.editorStyle}
                        onEditorStateChange={(editorState) =>
                          setFieldValue(
                            `meetingPlan[${index}].onlineActivity`,
                            draftToHtml(
                              convertToRaw(editorState.getCurrentContent())
                            )
                          )
                        }
                      />
                      <FormHelperText error>
                        <b>{errors.meetingPlan?.[index]?.onlineActivity}</b>
                      </FormHelperText>
                    </div>

                    <button
                      className="mt-5 bg-red-600 text-white px-3 py-2 rounded-md flex items-center hover:bg-red-800 transition-colors duration-300"
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      Hapus Pertemuan
                      <DeleteIcon style={{ fontSize: 16, marginLeft: 5 }} />
                    </button>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}

            <div>
              <button
                className="mt-5 bg-blue-600 text-white px-3 py-2 rounded-md flex items-center hover:bg-blue-800 transition-colors duration-300"
                onClick={() =>
                  arrayHelpers.push({
                    week: "",
                    cpmkList: [""],
                    subCpmkDescription: "",
                    achievementIndicators: "",
                    assessmentModel: "",
                    material: "",
                    method: "",
                    offlineActivity: "",
                    onlineActivity: "",
                  })
                }
              >
                Tambah Pertemuan
                <AddCircleOutlineIcon style={{ fontSize: 16, marginLeft: 5 }} />
              </button>
              <FormHelperText error>
                <b>
                  {typeof errors.meetingPlan === "string" && errors.meetingPlan}
                </b>
              </FormHelperText>
            </div>
          </Fragment>
        )}
      />
    </div>
  );
};

const styles = {
  editorStyle: {
    width: "100%",
    minHeight: 100,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "lightgray",
  },
};

export default RencanaPertemuan;
