import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Field, FieldArray, useFormikContext } from "formik";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
} from "@mui/material";
import { GetSubjects } from "app/api";

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

const CPMK = () => {
  const { values, errors } = useFormikContext();

  const cplQuery = useQuery({
    queryKey: ["cpl", values.subjectId],
    queryFn: () => GetSubjects.cpl(values.subjectId),
  });

  return (
    <>
      <div className="bg-white rounded-sm p-5">
        <h1 className="text-base font-semibold mb-5">
          Capaian Pembelajaran Lulusan (CPL) PRODI
        </h1>
        <div>
          <table className="w-full border-collapse border">
            <thead className="bg-stone-200">
              <tr>
                <th className="border px-2 text-left">ID CPL</th>
                <th className="border px-2 text-left">Deskripsi CPL</th>
              </tr>
            </thead>
            <tbody>
              {cplQuery.data?.map((item, index) => (
                <tr key={index}>
                  <td className="border px-2">{item.code}</td>
                  <td className="border px-2">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-sm p-5 mt-5">
        <h1 className="text-base font-semibold mb-5">
          Capaian Pembelajaran Mata Kuliah
        </h1>

        <FieldArray
          name="cpmk"
          render={(arrayHelpers) => (
            <>
              {values.cpmk.map((_, index) => (
                <div className="grid grid-cols-3 gap-4 border-b-2 mb-8 pb-5 relative">
                  <div>
                    <p className="mb-2">ID CPMK</p>
                    <Field
                      name={`cpmk[${index}].code`}
                      type="text"
                      className="border border-gray-300 p-2 w-full rounded-md h-14"
                    />
                    <FormHelperText error>
                      <b>{errors?.cpmk?.[index]?.code}</b>
                    </FormHelperText>
                  </div>

                  <div>
                    <p className="mb-2">Deskripsi</p>
                    <Field
                      name={`cpmk[${index}].description`}
                      as="textarea"
                      className="border border-gray-300 p-2 w-full rounded-md h-24"
                      rows="4"
                    />
                    <FormHelperText error>
                      <b>{errors?.cpmk?.[index]?.description}</b>
                    </FormHelperText>
                  </div>

                  <div className="relative">
                    <p className="mb-2">CPL yang di Dukung</p>
                    <FormControl sx={{ width: "90%" }}>
                      <Field name={`cpmk[${index}].supportedCplIds`}>
                        {({ field }) => (
                          <Select
                            {...field}
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
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
                                    label={
                                      cplQuery.data?.find(
                                        (item) => item.id === value
                                      )?.code
                                    }
                                  />
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                          >
                            {cplQuery.data?.map((item) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.code}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      </Field>
                      <FormHelperText error>
                        <b>{errors?.cpmk?.[index]?.supportedCplIds}</b>
                      </FormHelperText>
                    </FormControl>
                  </div>

                  <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                    <DeleteIcon
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => arrayHelpers.remove(index)}
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() =>
                  arrayHelpers.push({
                    description: "",
                    code: "",
                    supportedCplIds: [],
                  })
                }
                className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center hover:bg-blue-800 transition-colors duration-300"
              >
                Tambah CPMK
                <AddCircleOutlineIcon style={{ fontSize: 16, marginLeft: 5 }} />
              </button>
              <FormHelperText error>
                <b>{typeof errors.cpmk === "string" && errors.cpmk}</b>
              </FormHelperText>
            </>
          )}
        />
      </div>
    </>
  );
};

export default CPMK;
