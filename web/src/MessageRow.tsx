import { FC, memo } from "react";
import { DirectMessage, Message } from "./hooks/useChatRoomClient";
import { Paper, Stack, Typography, styled } from "@mui/material";

const RowPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  gap: theme.spacing(1),
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "baseline",
}));

type MessageType = "direct" | "join" | "leave" | "message";

const stylesByType: Record<
  MessageType,
  { borderColor?: string; backgroundColor?: string }
> = {
  direct: {
    borderColor: "#F99",
    backgroundColor: "#FCC",
  },
  join: {
    borderColor: "#9F9",
    backgroundColor: "#CFC",
  },
  leave: {
    borderColor: "#99F",
    backgroundColor: "#CCF",
  },
  message: {},
};

const MessageRowInternal: FC<Message | DirectMessage> = (message) => {
  const styles = stylesByType[message.type] || stylesByType.message;

  const getHeader = (message: Message | DirectMessage) => {
    if (message.type === "direct") return `${message.from} → ${message.to}`;
    return message.from;
  };

  return (
    <RowPaper sx={styles}>
      <Typography variant="body2">{getHeader(message)}</Typography>
      <Typography variant="caption" fontSize="0.5rem">
        {new Date(message.publishDateTime).toLocaleString("ja-JP")}
      </Typography>
      <Typography variant="body1">{message.body}</Typography>
    </RowPaper>
  );
};

export const MessageRow = memo(MessageRowInternal);
