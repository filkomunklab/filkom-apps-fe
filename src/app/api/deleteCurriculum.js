import { obeClient } from "./client";

export default async function deleteCurriculum(rpsId) {
  const { data } = await obeClient.delete(`/curriculum/${rpsId}`);
  return data;
}
