import { OBE_BASE_URL_API } from "@jumbo/config/env";
import axios from "axios";

export default async function getRpsList(payload) {
  const { major, teacherId } = payload;
  const query = teacherId ? `?teacherId=${teacherId}` : "";
  const { data } = await axios.get(
    `${OBE_BASE_URL_API}/api/rps/list/${major}${query}`
  );
  console.log(data.data);
  return data.data;
}
