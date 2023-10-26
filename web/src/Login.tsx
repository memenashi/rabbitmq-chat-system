import { FC, useCallback, useState } from "react";
import { Chat, LoginInfo } from "./Chat";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Stack,
  Typography,
  TextField,
  Button,
  FormHelperText,
  Paper,
  styled,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { ObjectSchema, object, string } from "yup";
import { userApi } from "./generated/api";
import { LoginRequest } from "./generated/api";

const schema: ObjectSchema<LoginInfo> = object().shape({
  username: string().min(1).max(16).required(),
  password: string().required(),
});

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  minWidth: "640px",
  width: "50%",
}));

const LoginBackground = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: "100vh",
  width: "100vw",
  justifyContent: "center",
}));

export const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleLogin = useCallback(
    (data: LoginInfo) => {
      userApi.userControllerLogin({
        username: data.username,
        password: data.password,
      });
    },
    [register],
  );

  return (
    <LoginBackground alignItems="center">
      <LoginPaper>
        <Stack alignItems="center" gap={2}>
          <Typography variant="h3">おかえりなさい！</Typography>
          <form onSubmit={handleSubmit()}>
            <Stack gap={2} width="100%">
              <TextField {...register("username")} label="ユーザー名" />
              {errors.username && (
                <FormHelperText error>{errors.username.message}</FormHelperText>
              )}
              <TextField {...register("password")} label="パスワード" />
              {errors.password && (
                <FormHelperText error>{errors.password.message}</FormHelperText>
              )}
              <Button type="submit" variant="contained">
                Login
              </Button>
            </Stack>
          </form>
        </Stack>
      </LoginPaper>
    </LoginBackground>
  );
};
