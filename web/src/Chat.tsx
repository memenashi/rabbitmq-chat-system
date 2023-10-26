import { Paper, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { MessagesApi } from "./api/generated";
import { messagesApi } from "./api";
import { MessageArea } from "./components/MessageArea";
import { PostArea } from "./components/PostArea";

export const Chat: FC = () => {
  const { data: messages, refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      messagesApi
        .messageControllerFindBeforeLastMessage({ limit: 100 })
        .then((res) => res.data),
  });
  return (
    <>
      <Stack gap={2} minHeight="0" padding={2} overflow="auto" flexGrow={1}>
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
          <MessageArea messages={messages} />
        </Paper>
      </Stack>
      <PostArea onSubmit={refetch} />
    </>
  );
};
