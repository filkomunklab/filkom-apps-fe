import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Field, useFormikContext } from "formik";
import { useQuery } from "@tanstack/react-query";
import { GetSubjects, getTeacher } from "app/api";
import { convertShortMajor } from "app/utils/appHelpers";
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

const MediaPembelajaran = () => {
  const { values, errors } = useFormikContext();

  const employee = useQuery({
    queryKey: ["employee"],
    queryFn: getTeacher,
  });

  const preReqSubject = useQuery({
    queryKey: ["preReqSubject", values.subjectId],
    queryFn: () => GetSubjects.preRequisite(values.subjectId),
  });

  if (employee.status === "pending" || preReqSubject.status === "pending")
    return <CreateRpsSkeleton />;

  return (
    <div>
      <div className="bg-white rounded-sm p-5 my-5">
        <h1 className="text-lg font-semibold mb-5">Media Pembelajaran</h1>

        <div className="mb-5 grid grid-cols-2 gap-4">
          <div>
            <p className="mb-2">Software</p>
            <Field
              name="software"
              type="text"
              className="w-full border border-gray-400 rounded-md p-2 py-[15px] hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
              placeholder="Ex.Arena Simulation Software"
            />
            <FormHelperText error>
              <b>{errors.software}</b>
            </FormHelperText>
          </div>

          <div>
            <p className="mb-2">Hardware</p>
            <Field
              name="hardware"
              type="text"
              className="w-full border border-gray-400 rounded-md p-2 py-[15px] hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
              placeholder="Ex. Komputer/Laptop, Proyektor, dll"
            />
            <FormHelperText error>
              <b>{errors.hardware}</b>
            </FormHelperText>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-sm p-5 my-5">
        <h1 className="text-lg font-semibold mb-5">Team Teaching</h1>

        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-multiple-chip-label">Nama Dosen</InputLabel>
          <Field name="teamTeaching">
            {({ field }) => (
              <Select
                {...field}
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                input={
                  <OutlinedInput id="select-multiple-chip" label="Nama Dosen" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value, index) => (
                      <Chip key={index} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {employee.data?.map((item, index) => (
                  <MenuItem key={index} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Field>
          <FormHelperText error>
            <b>
              {typeof errors.teamTeaching === "string" && errors.teamTeaching}
            </b>
          </FormHelperText>
        </FormControl>
      </div>
      <div className="bg-white rounded-sm p-5 my-5">
        <h1 className="text-lg font-semibold mb-5">MataKuliah Syarat</h1>

        <div>
          <table className="w-full border-collapse border">
            <thead className="bg-stone-200">
              <tr>
                <th className="border text-left px-2">Nama Matakuliah</th>
                <th className="border px-2">Jumlah Credit(s)</th>
              </tr>
            </thead>
            <tbody>
              {preReqSubject.data?.Prerequisite.map((item, index) => (
                <Fragment key={index}>
                  <tr>
                    <th colSpan={2}>{`${convertShortMajor(
                      item.curriculum.major
                    )} - ${item.curriculum.year}`}</th>
                  </tr>
                  {item.prerequisite.map((item) => (
                    <tr key={item.id}>
                      <td className="border px-2">
                        {`[${item.code}] ${item.indonesiaName}/ ${item.englishName}`}
                      </td>
                      <td className="border text-center px-2">
                        {item.credits}
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white rounded-sm p-5 my-5">
        <h1 className="text-lg font-semibold mb-5">Ambang Batas Kelulusan</h1>

        <div className="mb-5 grid grid-cols-2 gap-4">
          <div>
            <p className="mb-2">Mahasiswa</p>
            <Field
              name="minPassStudents"
              type="text"
              className="w-full border border-gray-400 rounded-md p-2 py-[15px] hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
              placeholder="Ex. 50.01"
            />
            <FormHelperText error>
              <b>{errors.minPassStudents}</b>
            </FormHelperText>
          </div>

          <div>
            <p className="mb-2">Matakuliah</p>
            <Field
              name="minPassGrade"
              type="text"
              className="w-full border border-gray-400 rounded-md p-2 py-[15px] hover:border-gray-600 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out"
              placeholder="Ex. 85.00%"
            />
            <FormHelperText error>
              <b>{errors.minPassGrade}</b>
            </FormHelperText>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPembelajaran;
