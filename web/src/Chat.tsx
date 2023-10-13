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
  hostname: string;
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

export const Chat: FC<LoginInfo & { onLogout: () => void }> = (props) => {
  const { sendMessage, messages, close } = useChatRoomClient({
    ...props,
  });

  const handleClose = useCallback(() => {
    const leaveMessage: Message = {
      type: "leave",
      body: `${props.username} left`,
      from: props.username,
      publishDateTime: new Date(),
    };
    sendMessage(leaveMessage);
    close();
    props.onLogout();
  }, []);

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<EntireMessage>({
    defaultValues: {
      body: "",
      type: "message",
      from: props.username,
      publishDateTime: new Date(),
    },
    resolver: yupResolver(schema) as any,
  });

  const handleSendMessage = useCallback((message: EntireMessage) => {
    sendMessage({
      ...message,
      publishDateTime: new Date(),
      from: props.username,
    });
    reset();
  }, []);

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
          <Typography variant="body1">{`hello ${props.username}`}</Typography>
          <Button onClick={handleClose}>Logout</Button>
        </Stack>
        {messages.length ? (
          <Stack
            gap={1}
            sx={{ overflowY: "auto" }}
            flex={1}
            justifyContent="flex-end"
          >
            {messages.map((message) => (
              <MessageRow
                key={message.publishDateTime.toLocaleString()}
                {...message}
              />
            ))}
          </Stack>
        ) : null}
      </Paper>
      <Paper sx={{ padding: 2 }}>
        <SendMessageForm
          control={control}
          register={register}
          errors={errors}
          onSubmit={handleSubmit(handleSendMessage)}
        />
      </Paper>
    </Stack>
  );
};
