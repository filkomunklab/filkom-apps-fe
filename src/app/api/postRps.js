import { obeClient } from "./client";

export default async function postRps(value) {
  delete value.gradingSystem;
  const { data } = await obeClient.post("/rps", value);
  return data.data;
}
