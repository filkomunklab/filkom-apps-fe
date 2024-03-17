import { OBE_BASE_URL_API } from "@jumbo/config/env";
import axios from "axios";

export default function postCpl(payload) {
  const { file, curriculumId } = payload;
  const formData = new FormData();
  formData.append("curriculumCpl", file);

  return axios.post(
    `${OBE_BASE_URL_API}/api/curriculum/${curriculumId}/cpl`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}
