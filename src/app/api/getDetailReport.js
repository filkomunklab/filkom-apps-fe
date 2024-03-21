import { OBE_BASE_URL_API } from "@jumbo/config/env";
import axios from "axios";

export default async function getDetailReport(rpsId) {
  const { data } = await axios.get(
    `${OBE_BASE_URL_API}/api/report-detail/${rpsId}`
  );
  return data.data;
}
