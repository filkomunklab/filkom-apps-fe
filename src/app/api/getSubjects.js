import { OBE_BASE_URL_API } from "@jumbo/config/env";
import axios from "axios";

export default async function getSubjects(curriculumId) {
  const { data } = await axios.get(
    `${OBE_BASE_URL_API}/api/curriculum/${curriculumId}`
  );
  console.log(data.data);
  return data.data;
}
