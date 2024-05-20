import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useQuery } from "@tanstack/react-query";
import { getTeacher } from "app/api";
import { Field, useFormikContext } from "formik";
import { FormHelperText } from "@mui/material";
import CreateRpsSkeleton from "../CreateRpsSkeleton";

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

const Otoritas = () => {
  const { errors } = useFormikContext();

  const employee = useQuery({
    queryKey: ["employee"],
    queryFn: getTeacher,
  });

  if (employee.status === "pending" && !employee.data)
    return <CreateRpsSkeleton />;

  return (
    <div className="bg-white rounded-sm p-5">
      <h1 className="text-base font-semibold mb-5">Otoritas</h1>
      <div className="mb-5">
        <p className="mb-2">Pengembang RPS</p>
        <Field
          name="rpsDeveloper"
          type="text"
          className="w-full border border-gray-400 rounded-md p-2 py-4 hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
          placeholder="Seperate by semicolon (;)"
        />
        <FormHelperText error>
          <b>{errors.rpsDeveloper}</b>
        </FormHelperText>
      </div>

      <div className="mb-5">
        <p className="mb-2">Ketua Kelompok Keahlian</p>
        <FormControl sx={{ minWidth: 120, width: "100%" }}>
          <Field name="headOfExpertise">
            {({ field }) => (
              <Select
                {...field}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                MenuProps={MenuProps}
              >
                <MenuItem value="">
                  <em>Pilih Pengembang</em>
                </MenuItem>
                {employee.data?.map((item) => (
                  <MenuItem key={item.value} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Field>
          <FormHelperText error>
            <b>{errors.headOfExpertise}</b>
          </FormHelperText>
        </FormControl>
      </div>

      <div className="">
        <p className="mb-2">Kaprodi</p>
        <FormControl sx={{ minWidth: 120, width: "100%" }}>
          <Field name="headOfProgramStudy">
            {({ field }) => (
              <Select
                {...field}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                MenuProps={MenuProps}
              >
                <MenuItem value="">
                  <em>Pilih Kaprodi</em>
                </MenuItem>
                {employee.data?.map((item) => (
                  <MenuItem key={item.value} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Field>
          <FormHelperText error>
            <b>{errors.headOfProgramStudy}</b>
          </FormHelperText>
        </FormControl>
      </div>
    </div>
  );
};
export default Otoritas;
