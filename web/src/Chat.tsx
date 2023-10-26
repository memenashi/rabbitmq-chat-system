import { Paper, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { MessagesApi } from "./api/generated";
import { messagesApi } from "./api";

export const Chat: FC = () => {
  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: () => messagesApi.messageControllerFindBeforeLastMessage({}),
  });
  return (
    <Stack gap={2} minHeight="0" padding={2} overflow="auto">
      <Paper
        elevation={4}
        sx={{
          padding: 2,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <Stack
          direction="row"
          alignItems="baseline"
          justifyContent="space-between"
          gap={1}
        >
          <Typography variant="h4">Chat</Typography>
        </Stack>
      </Paper>
    </Stack>
  );
};
