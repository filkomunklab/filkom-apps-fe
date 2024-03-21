import { OBE_BASE_URL_API } from "@jumbo/config/env";
import axios from "axios";

export default function putStudentGrade(data) {
  const { file, gradingSystemId } = data;
  const formData = new FormData();
  formData.append("grade", file);
  return axios.put(
    `${OBE_BASE_URL_API}/api/student-grade/${gradingSystemId}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
}
