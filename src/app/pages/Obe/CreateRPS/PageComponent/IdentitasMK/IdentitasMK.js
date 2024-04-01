import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useQuery } from "@tanstack/react-query";
import { GetSubjects } from "app/api";
import { useFormikContext } from "formik";
import { FormHelperText } from "@mui/material";

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

const IdentitasMK = () => {
  const { handleChange, values, errors } = useFormikContext();

  const subjectsQuery = useQuery({
    queryKey: ["subjects"],
    queryFn: GetSubjects.all,
  });

  return (
    <div className="bg-white rounded-sm p-5">
      <h1 className="text-base font-semibold mb-5">Identitas Mata Kuliah</h1>
      <div className="mb-5">
        <p className="mb-2">Nama Mata Kuliah</p>
        <FormControl sx={{ minWidth: 120, width: "100%" }}>
          <Select
            name="subjectId"
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            value={values.subjectId}
            MenuProps={MenuProps}
          >
            {subjectsQuery.data?.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>
            <b>{errors.subjectId}</b>
          </FormHelperText>
        </FormControl>
      </div>

      <div className="mb-5">
        <p className="mb-2">Rumpun Mata Kuliah</p>
        <input
          name="subjectFamily"
          type="text"
          className="w-full border border-gray-400 rounded-md p-2 py-4 hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
          placeholder="Ex. Business and Management"
          onChange={handleChange}
          value={values.subjectFamily}
        />
        <FormHelperText error>
          <b>{errors.subjectFamily}</b>
        </FormHelperText>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-4">
        <div>
          <p className="mb-2">Pararel</p>
          <input
            name="parallel"
            type="text"
            className="w-full border border-gray-400 rounded-md p-2 py-[15px] hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
            placeholder="Ex.A"
            onChange={handleChange}
            value={values.parallel}
          />
          <FormHelperText error>
            <b>{errors.parallel}</b>
          </FormHelperText>
        </div>

        <div>
          <p className="mb-2">Jadwal</p>
          <input
            name="schedule"
            type="text"
            className="w-full border border-gray-400 rounded-md p-2 py-[15px] hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
            placeholder="Ex. Rabu [8.40 - 12.00] at GK1-402"
            onChange={handleChange}
            value={values.schedule}
          />
          <FormHelperText error>
            <b>{errors.schedule}</b>
          </FormHelperText>
        </div>
      </div>

      <div>
        <p className="mb-2">Deskripsi Mata Kuliah</p>

        <textarea
          className="w-full border border-gray-400 rounded-md p-2 py-4 hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
          name="subjectDescription"
          onChange={handleChange}
          value={values.subjectDescription}
          rows={5}
        />
        <FormHelperText error>
          <b>{errors.subjectDescription}</b>
        </FormHelperText>
      </div>

      {/* <div className="mb-5 grid grid-cols-2 gap-4">
        <div>
          <p className="mb-2">Semester</p>
          <FormControl sx={{ minWidth: 120, width: "100%" }}>
            <Select
              value={semester}
              onChange={handleSemester}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Pilih Semester</em>
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
            </Select>
          </FormControl>
        </div>

        <div>
          <p className="mb-2">Direvisi</p>
          <input
            type="date"
            className="w-full border border-gray-400 rounded-md p-2 py-[14px] hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
            value={direvisi}
            onChange={handleDirevisi}
          />
        </div>
      </div> */}
    </div>
  );
};
export default IdentitasMK;
