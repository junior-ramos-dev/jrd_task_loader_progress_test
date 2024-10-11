import React, { useContext } from "react";
import { RingLoader } from "react-spinners";

import {
  Box,
  LinearProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import { TaskLoaderProgressContext } from "../../node_modules/jrd_task_loader_progress/dist";

// Return the message for each step
export const STEP_MSG_MAP: Record<number, string> = {
  0: "Starting...",
  1: "Checking E-Mail...",
  2: "Getting Credentials...",
  3: "Creating Account...",
  4: "Getting User games list...",
  5: "Loading games icons...",
  6: "Getting games trophy lists...",
  7: "Finishing...",
};

export const RingProgressBar = () => {
  const theme = useTheme();
  const { progress, buffer, taskId } = useContext(TaskLoaderProgressContext);

  const message = STEP_MSG_MAP[taskId];

  console.log(taskId, STEP_MSG_MAP[taskId]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Stack alignItems="center" spacing={2} sx={{ width: "30%" }}>
        <RingLoader color={theme.palette.primary.main} />
        <Typography variant="subtitle2">{`${message}: ${progress}%`}</Typography>
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            variant="buffer"
            value={progress}
            valueBuffer={buffer}
          />
        </Box>
      </Stack>
    </Box>
  );
};
