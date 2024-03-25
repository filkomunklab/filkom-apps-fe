import { obeClient } from "./client";

export default async function getRpsListTeacher(payload) {
  const { teacherId } = payload;
  const { data } = await obeClient.get(`/rps/list/teacher/${teacherId}`);
  return data.data;
}
