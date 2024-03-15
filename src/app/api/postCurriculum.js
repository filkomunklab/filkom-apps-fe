import { OBE_BASE_URL_API } from "@jumbo/config/env";
import axios from "axios";

export default function postCurriculum(data) {
  const formData = new FormData();
  formData.append("major", data.major);
  formData.append("year", data.year);
  formData.append("headOfProgramStudyId", data.headOfProgramStudyId);
  formData.append("curriculumFile", data.curriculumFile);
  return axios.post(`${OBE_BASE_URL_API}/api/curriculum`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
