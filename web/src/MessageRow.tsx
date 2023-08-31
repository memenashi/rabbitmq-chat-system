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

const MessageRowInternal: FC<Message | DirectMessage> = (message) => {
  if (message.type === "direct")
    return (
      <RowPaper sx={{ borderColor: "#F99", backgroundColor: "#FCC" }}>
        <Typography variant="body2">
          {`${message.from} → ${message.to}`}
        </Typography>
        <Typography variant="caption" fontSize="0.5rem">
          {message.publishDateTime.toLocaleString()}
          {/* {format(message.publishDateTime, "yyyy/MM/dd HH:mm")} */}
        </Typography>
        <Typography variant="body1">{message.body}</Typography>
      </RowPaper>
    );

  if (message.type === "join")
    return (
      <RowPaper sx={{ borderColor: "#9F9", backgroundColor: "#CFC" }}>
        <Typography variant="body2">{message.from}</Typography>
        <Typography variant="caption" fontSize="0.5rem">
          {message.publishDateTime.toLocaleString()}
        </Typography>
        <Typography variant="body1">{message.body}</Typography>
      </RowPaper>
    );

  if (message.type === "leave")
    return (
      <RowPaper sx={{ borderColor: "#99F", backgroundColor: "#CCF" }}>
        <Typography variant="body2">{message.from}</Typography>
        <Typography variant="caption" fontSize="0.5rem">
          {message.publishDateTime.toLocaleString()}
        </Typography>
        <Typography variant="body1">{message.body}</Typography>
      </RowPaper>
    );
  return (
    <RowPaper>
      <Typography variant="body2">{message.from}</Typography>
      <Typography variant="caption" fontSize="0.5rem">
        {message.publishDateTime.toLocaleString()}
      </Typography>
      <Typography variant="body1">{message.body}</Typography>
    </RowPaper>
  );
};

export const MessageRow = memo(MessageRowInternal);
