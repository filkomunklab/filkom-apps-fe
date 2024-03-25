import { obeClient } from "./client";

export default async function getSubjects(curriculumId) {
  const { data } = await obeClient.get(`/curriculum/${curriculumId}`);
  console.log(data.data);
  return data.data;
}
