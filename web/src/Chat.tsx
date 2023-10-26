import { Button, Paper, Stack, Typography } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { date, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  DirectMessage,
  EntireMessage,
  Message,
  useChatRoomClient,
} from "./hooks/useChatRoomClient";
import { SendMessageForm } from "./SendMessageForm";
import { format } from "date-fns";
import { MessageRow } from "./MessageRow";

export interface LoginInfo {
  username: string;
  password: string;
}

const schema = object().shape({
  body: string().min(1).max(256).required(),
  type: string().oneOf(["message", "direct"]).required(),
  to: string().when({
    is: "direct",
    then: (schema) => schema.min(1).max(16).required(),
    otherwise: (schema) => schema.nullable(),
  }),
  from: string().required(),
  publishDateTime: date().required(),
});

export const Chat: FC = (props) => {
  return (
    <Stack
      gap={2}
      height="100vh"
      maxHeight="100vh"
      minHeight="0"
      padding={2}
      overflow="auto"
    >
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
