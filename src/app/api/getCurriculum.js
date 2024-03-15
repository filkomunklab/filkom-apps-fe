import { OBE_BASE_URL_API } from "@jumbo/config/env";
import axios from "axios";

export default async function getCurriculum(major) {
  const query = !major ? "" : `?major=${major}`;
  const { data } = await axios.get(
    `${OBE_BASE_URL_API}/api/curriculum${query}`
  );
  return data.data;
}
