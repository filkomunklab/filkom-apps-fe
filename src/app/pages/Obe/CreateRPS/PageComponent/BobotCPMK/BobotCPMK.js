import { useEffect, useState } from "react";
import { Field, FieldArray, useFormikContext } from "formik";
import { FormControl, MenuItem, Select } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const BobotCPMK = () => {
  const [newGrading, setNewGrading] = useState("");
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (values.cpmkGrading.length < values.cpmk.length) {
      const defaultValue = values.cpmk.map((item) => {
        return {
          code: item.code,
          totalGradingWeight: 0,
          gradingSystem: [
            {
              gradingName: "",
              gradingWeight: 0,
            },
          ],
        };
      });
      setFieldValue("cpmkGrading", defaultValue);
    }
  }, []);

  return (
    <div className="">
      <h1 className="bg-white rounded-sm p-5 text-base font-semibold">
        Bobot per Bentuk Penilaian Pada Tiap CPMK
      </h1>

      <FieldArray
        name="cpmkGrading"
        render={(outerHelpers) => (
          <>
            {values.cpmkGrading.map((item, index) => (
              <div className="bg-white rounded-sm p-5 mt-5">
                <div className="flex justify-between mb-5 border-b-[1px] pb-2">
                  <h1 className="text-xl font-semibold">{item.code}</h1>
                  <p className="text-base font-semibold">
                    Total bobot : <span>{item.totalGradingWeight}</span>
                  </p>
                </div>
                <FieldArray
                  name={`cpmkGrading[${index}].gradingSystem`}
                  render={(arrayHelpers) => (
                    <>
                      {item.gradingSystem.map((_, innerIndex) => (
                        <div className="grid grid-cols-2 gap-3 mb-10">
                          <div>
                            <div className="flex justify-between">
                              <p className="font-semibold mb-2">
                                Bentuk Penilaian
                              </p>
                              <p>
                                Total per Penilaian :{" "}
                                <span>
                                  {
                                    values.gradingSystem.find(
                                      (item) =>
                                        item.label ===
                                        values.cpmkGrading[index].gradingSystem[
                                          innerIndex
                                        ].gradingName
                                    )?.value
                                  }
                                </span>
                              </p>
                            </div>
                            <FormControl fullWidth>
                              <Field
                                name={`cpmkGrading[${index}].gradingSystem[${innerIndex}].gradingName`}
                              >
                                {({ field }) => (
                                  <Select
                                    {...field}
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                  >
                                    {values.gradingSystem?.map((item) => (
                                      <MenuItem value={item.label}>
                                        {item.label}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                )}
                              </Field>
                            </FormControl>
                          </div>

                          <div>
                            <div className="flex justify-between">
                              <p className="font-semibold mb-2">
                                Total per Penilaian
                              </p>
                              <p>
                                Sisa Bobot :{" "}
                                <span>
                                  {values.gradingSystem.find(
                                    (item) =>
                                      item.label ===
                                      values.cpmkGrading[index].gradingSystem[
                                        innerIndex
                                      ].gradingName
                                  )?.value -
                                    values.cpmkGrading[index].gradingSystem[
                                      innerIndex
                                    ].gradingWeight}
                                </span>
                              </p>
                            </div>
                            <Field
                              name={`cpmkGrading[${index}].gradingSystem[${innerIndex}].gradingWeight`}
                              type="number"
                              className="border border-gray-300 p-2 w-full h-[53px] rounded-md active:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300"
                              min={0}
                            />
                            {12 < 0 && (
                              <div className="text-end mt-2">
                                <p className="text-red-500 text-xs">
                                  Bobot Melebihi Limit
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      <div>
                        <button
                          onClick={() => {
                            arrayHelpers.push({
                              gradingName: "",
                              gradingWeight: 0,
                            });
                          }}
                          className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center hover:bg-blue-800 transition-colors duration-300"
                        >
                          Tambah Bentuk
                          <AddCircleOutlineIcon
                            style={{ fontSize: 16, marginLeft: 5 }}
                          />
                        </button>
                      </div>
                    </>
                  )}
                />
              </div>
            ))}
            <div className="bg-white rounded-sm p-5 mt-5">
              <p className="font-semibold mb-2">Kode Penilaian</p>
              <input
                onChange={(e) => setNewGrading(e.target.value)}
                type="text"
                className="border border-gray-300 p-2 w-full h-[53px] rounded-md active:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300"
                value={newGrading}
              />
              <button
                onClick={() => {
                  outerHelpers.push({
                    code: newGrading,
                    totalGradingWeight: 0,
                    gradingSystem: [
                      {
                        gradingName: "",
                        gradingWeight: 0,
                      },
                    ],
                  });
                  setNewGrading("");
                }}
                disabled={!newGrading}
                className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center hover:bg-blue-800 disabled:bg-blue-400 transition-colors duration-300 mt-5"
              >
                Tambah Penilaian
                <AddCircleOutlineIcon style={{ fontSize: 16, marginLeft: 5 }} />
              </button>
            </div>
          </>
        )}
      />
    </div>
  );
};

export default BobotCPMK;
