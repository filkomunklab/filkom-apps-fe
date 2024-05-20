import { obeClient } from "./client";

export default async function getRpsListSummary() {
  const { data } = await obeClient.get("/rps/list/major-summary");
  console.log(data.data);
  return data.data;
}
