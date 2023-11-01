import { IconButton, Paper, Stack, TextField, styled } from "@mui/material";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { PostMessageRequest } from "../api/generated";
import { ObjectSchema, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SendIcon from "@mui/icons-material/Send";
import { messagesApi } from "../api";

const schema: ObjectSchema<PostMessageRequest> = object().shape({
  content: string().required().min(1).max(4096),
  to: string().required(),
  type: string()
    .required()
    .oneOf(["message", "join", "leave", "direct"] as const),
});

const CustomTextField = styled(TextField)({
  minWidth: 0,
  flexGrow: 1,
});

const defaultValues: PostMessageRequest = {
  content: "",
  to: "undefined",
  type: "message",
};

export const PostArea: FC<{ onSubmit?: () => void }> = ({ onSubmit }) => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, isValid },
  } = useForm<PostMessageRequest>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const submitHandler = async (data: PostMessageRequest) => {
    await messagesApi.messageControllerCreate(data);
    reset(defaultValues);
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Stack
        component={Paper}
        width="100%"
        display="inline-flex"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexGrow={1}
        minWidth={0}
        gap={1}
        padding={2}
      >
        <Controller
          control={control}
          name={"content"}
          render={({ field: { ref, ...props } }) => (
            <CustomTextField {...props} inputRef={ref} />
          )}
        />
        <IconButton disabled={isSubmitting || !isValid} type="submit">
          <SendIcon />
        </IconButton>
      </Stack>
    </form>
  );
};
