import { OBE_BASE_URL_API } from "@jumbo/config/env";
import axios from "axios";

export default function putReportDetail(rpsId) {
  return axios.put(`${OBE_BASE_URL_API}/api/report-detail/${rpsId}`);
}
