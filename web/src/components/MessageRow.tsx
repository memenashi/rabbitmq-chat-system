import { FC, memo } from "react";
import { MessageResource } from "../api/generated";
import { Stack, Typography, styled } from "@mui/material";
import { format } from "date-fns";

const MinimumCaption = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.fontSize * 0.75,
}));

export const MessageRow = memo(function MessageRowInternal({
  message,
}: {
  message: MessageResource;
}) {
  const createdAt = new Date(message.createdAt);
  return (
    <Stack gap={1} direction="row" display="inline-flex" alignItems="flex-end">
      <Typography variant="body1">{message.user.username}</Typography>
      <MinimumCaption variant="caption">
        {format(createdAt, "HH:mm")}
      </MinimumCaption>
      <Typography variant="body1">{message.content}</Typography>
    </Stack>
  );
});
