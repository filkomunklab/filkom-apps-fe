import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormHelperText } from "@mui/material";
import { Field, FieldArray, useFormikContext } from "formik";

const PustakaPendukung = () => {
  const { values, errors } = useFormikContext();

  console.log(errors.supportingReferences);

  return (
    <div className="">
      <h1 className="font-semibold">Pustaka Pendukung :</h1>
      <FieldArray
        name="supportingReferences"
        render={(arrayHelpers) => (
          <>
            {values.supportingReferences.map((_, index) => (
              <>
                <div
                  key={index}
                  className="flex justify-center items-center px-5 py-2"
                >
                  <p>{index + 1}. </p>
                  <Field
                    as="textarea"
                    name={`supportingReferences[${index}]`}
                    className="border-2 border-gray-300 rounded-md w-full mx-5 p-2"
                    rows="2"
                  />
                  <DeleteIcon
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => arrayHelpers.remove(index)}
                  />
                </div>
                <FormHelperText error className="mb-5">
                  <b>{errors.supportingReferences?.[index]}</b>
                </FormHelperText>
              </>
            ))}
            <div>
              <button
                className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center hover:bg-blue-800 transition-colors duration-300"
                onClick={() => arrayHelpers.push("")}
              >
                Tambah Pustaka Pendukung
                <AddCircleOutlineIcon style={{ fontSize: 16, marginLeft: 5 }} />
              </button>
            </div>
          </>
        )}
      />
    </div>
  );
};

export default PustakaPendukung;
