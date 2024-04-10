import { Fragment } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormHelperText,
} from "@mui/material";
import { AddCircleOutline, ExpandMore, Delete } from "@mui/icons-material";
import { Field, FieldArray, useFormikContext } from "formik";

const RencanaTugas = () => {
  const { values, errors } = useFormikContext();

  return (
    <div className="bg-white rounded-sm p-5">
      <h1 className="text-lg font-semibold mb-10">Rencana Tugas Mahasiswa</h1>

      <FieldArray
        name="studentAssignmentPlan"
        render={(arrayHelpers) => (
          <Fragment>
            {values.studentAssignmentPlan.map((item, index) => (
              <div className="mb-5" key={index}>
                <Accordion className="bg-primary">
                  <AccordionSummary
                    expandIcon={
                      <ExpandMore
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
                      {`Rencana Tugas Mahasiswa ke-${index + 1}`}
                    </h2>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <div>
                        <p className="font-semibold mb-2">Bentuk Tugas</p>
                        <Field
                          name={`studentAssignmentPlan[${index}].assignmentModel`}
                          type="text"
                          className="w-full border border-gray-400 rounded-md p-2 py-[15px] hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
                          placeholder="Ex. Tugas 2: Journal Reading Reflection"
                        />
                        <FormHelperText error>
                          <b>
                            {
                              errors?.studentAssignmentPlan?.[index]
                                ?.assignmentModel
                            }
                          </b>
                        </FormHelperText>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Pustaka</p>
                        <Field
                          type="text"
                          name={`studentAssignmentPlan[${index}].references`}
                          className="w-full border border-gray-400 rounded-md p-2 py-[15px] hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
                          placeholder="Ex. [1]"
                        />
                        <FormHelperText error>
                          <b>
                            {errors?.studentAssignmentPlan?.[index]?.references}
                          </b>
                        </FormHelperText>
                      </div>
                    </div>

                    <div className="mb-5">
                      <p className="font-semibold mb-2">
                        SUB Capaian Pembelajaran
                      </p>
                      <Field
                        as="textarea"
                        name={`studentAssignmentPlan[${index}].subLearningOutcomes`}
                        className="w-full border border-gray-400 rounded-md p-2 py-[15px] h-24 hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
                      />
                      <FormHelperText error>
                        <b>
                          {
                            errors?.studentAssignmentPlan?.[index]
                              ?.subLearningOutcomes
                          }
                        </b>
                      </FormHelperText>
                    </div>

                    <div className="mb-5">
                      <p className="font-semibold mb-2">Deskripsi Tugas</p>
                      <Field
                        as="textarea"
                        name={`studentAssignmentPlan[${index}].assignmentDescription`}
                        className="w-full border border-gray-400 rounded-md p-2 py-[15px] h-24 hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
                      />
                      <FormHelperText error>
                        <b>
                          {
                            errors?.studentAssignmentPlan?.[index]
                              ?.assignmentDescription
                          }
                        </b>
                      </FormHelperText>
                    </div>

                    <div className="mb-5">
                      <p className="font-semibold mb-2">
                        Indikator, Kriteria, dan Bobot Penilaiaan
                      </p>
                      <Field
                        as="textarea"
                        name={`studentAssignmentPlan[${index}].icbValuation`}
                        className="w-full border border-gray-400 rounded-md p-2 py-[15px] h-24 hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
                      />
                      <FormHelperText error>
                        <b>
                          {errors?.studentAssignmentPlan?.[index]?.icbValuation}
                        </b>
                      </FormHelperText>
                    </div>

                    <div className="mb-5">
                      <div>
                        <p className="font-semibold mb-2">Jadwal Pelaksanaan</p>
                        <Field
                          name={`studentAssignmentPlan[${index}].dueSchedule`}
                          type="text"
                          className="w-full border border-gray-400 rounded-md p-2 py-[15px] hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
                          placeholder="Ex. Minggu ke-1 perkuliahan"
                        />
                        <FormHelperText error>
                          <b>
                            {
                              errors?.studentAssignmentPlan?.[index]
                                ?.dueSchedule
                            }
                          </b>
                        </FormHelperText>
                      </div>
                    </div>

                    <div className="mb-5">
                      <div>
                        <p className="font-semibold mb-2">Lain Lain</p>
                        <Field
                          name={`studentAssignmentPlan[${index}].others`}
                          type="text"
                          className="w-full border border-gray-400 rounded-md p-2 py-[15px] hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
                        />
                        <FormHelperText error>
                          <b>
                            {errors?.studentAssignmentPlan?.[index]?.others}
                          </b>
                        </FormHelperText>
                      </div>
                    </div>

                    <div className="mb-5">
                      <div>
                        <p className="font-semibold mb-2">Daftar Rujukan</p>
                        <Field
                          name={`studentAssignmentPlan[${index}].referenceList`}
                          type="text"
                          className="w-full border border-gray-400 rounded-md p-2 py-[15px] hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
                          placeholder="Ex. [1], various journal: Mazda vs. Ford Artikel"
                        />
                        <FormHelperText error>
                          <b>
                            {
                              errors?.studentAssignmentPlan?.[index]
                                ?.referenceList
                            }
                          </b>
                        </FormHelperText>
                      </div>
                    </div>

                    <button
                      className="mb-5 bg-red-600 text-white px-3 py-2 rounded-md flex items-center hover:bg-red-800 transition-colors duration-300"
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      Hapus Pertemuan
                      <Delete style={{ fontSize: 16, marginLeft: 5 }} />
                    </button>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}

            <div>
              <button
                className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center hover:bg-blue-800 transition-colors duration-300"
                onClick={() =>
                  arrayHelpers.push({
                    assignmentModel: "",
                    references: "",
                    subLearningOutcomes: "",
                    assignmentDescription: "",
                    icbValuation: "",
                    dueSchedule: "",
                    others: "",
                    referenceList: "",
                  })
                }
              >
                Tambah Rencana Tugas
                <AddCircleOutline style={{ fontSize: 16, marginLeft: 5 }} />
              </button>
              <FormHelperText error>
                <b>
                  {typeof errors.studentAssignmentPlan === "string" &&
                    errors.studentAssignmentPlan}
                </b>
              </FormHelperText>
            </div>
          </Fragment>
        )}
      />
    </div>
  );
};

export default RencanaTugas;
