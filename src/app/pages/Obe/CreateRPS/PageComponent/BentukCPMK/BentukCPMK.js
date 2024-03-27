import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Field, FieldArray, useFormikContext } from "formik";

const BentukCPMK = () => {
  const { values } = useFormikContext();

  return (
    <div className="bg-white rounded-sm p-5">
      <h1 className="text-base font-semibold mb-5">
        Bentuk Penilaian Pada Tiap CPMK
      </h1>
      <FieldArray
        name="gradingSystem"
        render={(arrayHelpers) => (
          <>
            {values.gradingSystem?.map((_, index) => (
              <div className="grid grid-cols-2 gap-3 border-b-2 mb-8 pb-5 relative">
                <div>
                  <p className="mb-2">Bentuk Penilaian</p>
                  <Field
                    name={`gradingSystem[${index}].label`}
                    type="text"
                    className="border border-gray-300 p-2 w-full rounded-md"
                  />
                </div>

                <div>
                  <p className="mb-2">Total Per Penilaian</p>
                  <Field
                    name={`gradingSystem[${index}].value`}
                    type="number"
                    inputMode="numeric"
                    className="border border-gray-300 p-2 w-[95%] rounded-md"
                  />
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
              onClick={() => arrayHelpers.push({ label: "", value: "", })}
              className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center hover:bg-blue-800 transition-colors duration-300"
            >
              Tambah Bentuk
              <AddCircleOutlineIcon style={{ fontSize: 16, marginLeft: 5 }} />
            </button>
          </>
        )}
      />
    </div>
  );
};

export default BentukCPMK;
