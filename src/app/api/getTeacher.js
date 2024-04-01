import { globalClient } from "./client";

export default async function getTeacher() {
  const { data } = await globalClient.get(`/employee`);
  const normalize = data.data
    .map((item) => ({
      label: `${item.firstName} ${item.lastName}`,
      value: item.id,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
  return normalize;
}
