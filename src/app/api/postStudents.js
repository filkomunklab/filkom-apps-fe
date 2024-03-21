import { OBE_BASE_URL_API } from "@jumbo/config/env";
import axios from "axios";

export default function postStudents(data) {
  const formData = new FormData();
  formData.append("classMember", data.file);
  return axios.post(
    `${OBE_BASE_URL_API}/api/rps/${data.rpsId}/member`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}
