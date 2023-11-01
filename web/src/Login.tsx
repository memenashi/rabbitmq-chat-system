import { FC, useCallback } from "react";
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
import { userApi } from "./api";
import { Navigate, useNavigate } from "react-router-dom";
import { LoginRequest } from "./api/generated";
import { useLoginUser } from "./hooks/useLoginUser";

export const passwordSchema = string()
  .required()
  .min(8)
  .max(24)
  .matches(/^[a-zA-Z0-9.?/-]{8,24}$/);

export const displayNameSchema = string().required().min(1).max(32);

export const mailSchema = string().email().required();

const schema: ObjectSchema<LoginRequest> = object().shape({
  email: mailSchema,
  password: passwordSchema,
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

const StyledForm = styled("form")({
  width: "100%",
});

export const Login: FC = () => {
  const nav = useNavigate();
  const { data, status, refetch } = useLoginUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleLogin = useCallback(
    async (data: LoginRequest) => {
      try {
        await userApi.userControllerLogin(data);
        refetch();
      } catch (_e) {
        console.log("error");
      }
    },
    [refetch],
  );

  if (data && status == "success") {
    return <Navigate to="/" />;
  }

  return (
    <LoginBackground alignItems="center">
      <LoginPaper>
        <Stack alignItems="center" gap={2}>
          <Typography variant="h3">おかえりなさい！</Typography>
          <StyledForm onSubmit={handleSubmit(handleLogin)}>
            <Stack gap={2} width="100%">
              <TextField {...register("email")} label="メールアドレス" />
              {errors.email && (
                <FormHelperText error>{errors.email.message}</FormHelperText>
              )}
              <TextField
                type="password"
                {...register("password")}
                label="パスワード"
              />
              {errors.password && (
                <FormHelperText error>{errors.password.message}</FormHelperText>
              )}
              <Button disabled={isSubmitting} type="submit" variant="contained">
                Login
              </Button>
            </Stack>
          </StyledForm>
          <Typography variant="body1">はじめましてだったかな？</Typography>
          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              nav("/register");
            }}
          >
            登録する
          </Button>
        </Stack>
      </LoginPaper>
    </LoginBackground>
  );
};
