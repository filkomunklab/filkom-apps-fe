import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const CreateRpsSkeleton = () => {
  return (
    <Stack gap={2}>
      {Array(5)
        .fill("test")
        .map((_, index) => (
          <Stack key={index} gap={1}>
            <Skeleton variant="rounded" width="20%" height={20} />
            <Skeleton variant="rounded" width="100%" height={70} />
          </Stack>
        ))}
    </Stack>
  );
};

export default CreateRpsSkeleton;
