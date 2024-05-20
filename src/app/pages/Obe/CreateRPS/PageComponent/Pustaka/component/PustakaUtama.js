import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Field, FieldArray, useFormikContext } from "formik";
import { FormHelperText } from "@mui/material";

const PustakaUtama = () => {
  const { values, errors } = useFormikContext();

  console.log(errors.mainReferences);

  return (
    <div className="mb-10">
      <h1 className="font-semibold">Pustaka Utama :</h1>

      <FieldArray
        name="mainReferences"
        render={(arrayHelpers) => (
          <>
            {values.mainReferences.map((_, index) => (
              <>
                <div
                  key={index}
                  className="flex justify-center items-center px-5 py-2"
                >
                  <p>{index + 1}</p>
                  <Field
                    as="textarea"
                    className="border-2 border-gray-300 rounded-md w-full mx-5 p-2"
                    rows="2"
                    name={`mainReferences[${index}]`}
                  />
                  <DeleteIcon
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => arrayHelpers.remove(index)}
                  />
                </div>
                <FormHelperText error className="mb-5">
                  <b>{errors.mainReferences?.[index]}</b>
                </FormHelperText>
              </>
            ))}

            <div>
              <button
                className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center hover:bg-blue-800 transition-colors duration-300"
                onClick={() => arrayHelpers.push("")}
              >
                Tambah Pustaka Utama
                <AddCircleOutlineIcon style={{ fontSize: 16, marginLeft: 5 }} />
              </button>
              <FormHelperText error>
                <b>{typeof errors.mainReferences === "string" && errors.mainReferences}</b>
              </FormHelperText>
            </div>
          </>
        )}
      />
    </div>
  );
};

export default PustakaUtama;
