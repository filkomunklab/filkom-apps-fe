import { obeClient } from "./client";

export default function putSubjectCpl(payload) {
  const { subjectId, values } = payload;
  return obeClient.put(
    `/subject/${subjectId}/cpl-mapping
    `,
    values
  );
}
