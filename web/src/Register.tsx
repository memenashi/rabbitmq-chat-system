import {
  Button,
  FormHelperText,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useCallback } from "react";
import { CreateUserDto } from "./api/generated";
import { userApi } from "./api";
import { useNavigate } from "react-router";
import { routes } from "./Router";
import { ObjectSchema, object, ref, string } from "yup";
import { displayNameSchema, passwordSchema } from "./Login";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const StyledDiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
}));

const RegisterPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  minWidth: "640px",
  width: "50%",
}));

interface RegisterFormValue extends CreateUserDto {
  passwordConfirm: string;
}

const registerSchema: ObjectSchema<RegisterFormValue> = object().shape({
  email: string().email().required(),
  password: passwordSchema,
  passwordConfirm: passwordSchema.oneOf(
    [ref("password")],
    "パスワードが一致しません",
  ),
  username: displayNameSchema,
});

export const Register = () => {
  const nav = useNavigate();
  const registerHandler = useCallback(async (data: CreateUserDto) => {
    userApi.userControllerRegister(data);
    userApi.userControllerLogin({ email: data.email, password: data.password });
    nav(routes.chat);
  }, []);

  const { control, handleSubmit } = useForm<RegisterFormValue>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      username: "",
    },
    resolver: yupResolver(registerSchema),
  });

  return (
    <StyledDiv>
      <form onSubmit={handleSubmit(registerHandler)}>
        <Stack component={RegisterPaper}>
          <Typography variant="h3">はじめまして！</Typography>
          <Stack gap={0}>
            <Controller
              control={control}
              name="email"
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <Stack gap={0}>
                  <TextField
                    {...field}
                    label="メールアドレス"
                    autoComplete="username"
                    inputRef={ref}
                  />
                  <FormHelperText error>{error?.message ?? " "}</FormHelperText>
                </Stack>
              )}
            />
            <Controller
              control={control}
              name="username"
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <Stack gap={0}>
                  <TextField {...field} label="ニックネーム" inputRef={ref} />
                  <FormHelperText error>{error?.message ?? " "}</FormHelperText>
                </Stack>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <Stack gap={0}>
                  <TextField
                    type="password"
                    {...field}
                    label="パスワード"
                    inputRef={ref}
                    autoComplete="new-password"
                  />
                  <FormHelperText error>{error?.message ?? " "}</FormHelperText>
                </Stack>
              )}
            />
            <Controller
              control={control}
              name="passwordConfirm"
              render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <Stack gap={0}>
                  <TextField
                    type="password"
                    {...field}
                    label="パスワード(確認)"
                    inputRef={ref}
                    autoComplete="new-password"
                  />
                  <FormHelperText error>{error?.message ?? " "}</FormHelperText>
                </Stack>
              )}
            />
          </Stack>
          <Button type="submit">はじめる</Button>
        </Stack>
      </form>
    </StyledDiv>
  );
};
