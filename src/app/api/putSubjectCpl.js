import { OBE_BASE_URL_API } from "@jumbo/config/env";
import axios from "axios";

export default function putSubjectCpl(payload) {
  const { subjectId, values } = payload;
  return axios.put(
    `${OBE_BASE_URL_API}/api/subject/${subjectId}/cpl-mapping
    `,
    values
  );
}
