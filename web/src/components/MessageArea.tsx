import { FC } from "react";
import { Stack } from "@mui/material";
import { MessageRow } from "./MessageRow";
import { MessageResource } from "../api/generated";

export const MessageArea: FC<{ messages: MessageResource[] | undefined }> = ({
  messages,
}) => {
  return (
    <Stack
      direction="column-reverse"
      minHeight="0"
      padding={2}
      overflow="auto"
      flexGrow={1}
    >
      {messages?.map((message) => (
        <MessageRow key={message.createdAt} message={message} />
      ))}
    </Stack>
  );
};
