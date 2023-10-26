import { IconButton, Paper, Stack, TextField, styled } from "@mui/material";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { PostMessageRequest } from "../api/generated";
import { ObjectSchema, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SendIcon from "@mui/icons-material/Send";
import { messagesApi } from "../api";

const schema: ObjectSchema<PostMessageRequest> = object().shape({
  content: string()
    .required()
    .min(1)
    .max(2 ^ 10),
  to: string().required(),
  type: string()
    .required()
    .oneOf(["message", "join", "leave", "direct"] as const),
});

const CustomTextField = styled(TextField)(({ theme }) => ({
  minWidth: 0,
  flexGrow: 1,
}));

export const PostArea: FC<{ onSubmit?: () => void }> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, isValid },
  } = useForm<PostMessageRequest>({
    defaultValues: {
      content: "",
      to: "undefined",
      type: "message",
    },
    resolver: yupResolver(schema),
  });

  const submitHandler = async (data: PostMessageRequest) => {
    await messagesApi.messageControllerCreate(data);
    reset();
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
