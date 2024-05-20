import { normalizeGrading } from "app/utils/appHelpers";
import { obeClient } from "./client";

export default async function getRpsDetail(rpsId) {
  const { data } = await obeClient.get(`/rps/${rpsId}`);
  data.data.GradingSystem = normalizeGrading(data.data.CpmkGrading);
  console.log(data.data);
  return data.data;
}
