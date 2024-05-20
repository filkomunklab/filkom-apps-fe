import { obeClient } from "./client";

export default async function putSummaryReport(rpsId) {
  const { data } = await obeClient.put(`/report-summary/${rpsId}`);
  return data.data;
}
