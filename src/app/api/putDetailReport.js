import { obeClient } from "./client";

export default function putReportDetail(rpsId) {
  return obeClient.put(`/report-detail/${rpsId}`);
}
