import { FC, useState } from "react";
import { Chat, LoginInfo } from "./Chat";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Stack,
  Typography,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { ObjectSchema, object, string } from "yup";

const schema: ObjectSchema<LoginInfo> = object().shape({
  username: string().min(1).max(16).required(),
  hostname: string().required(),
});

export const App: FC = () => {
  const [{ username, hostname }, setLoginInfo] = useState({
    username: "",
    hostname: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfo>({
    defaultValues: {
      username: "",
      hostname: window.location.hostname,
    },
    resolver: yupResolver(schema),
  });

  if (!username || !hostname)
    return (
      <form onSubmit={handleSubmit(setLoginInfo)}>
        <Stack alignItems="center" gap={2}>
          <Typography variant="h1">Login</Typography>
          <Typography variant="h2">Enter your username and hostname</Typography>
          <Typography variant="h3">Username</Typography>
          <TextField {...register("username")} />
          {errors.username && (
            <FormHelperText error>{errors.username.message}</FormHelperText>
          )}
          <Typography variant="h3">Hostname</Typography>
          <TextField {...register("hostname")} />
          {errors.hostname && (
            <FormHelperText error>{errors.hostname.message}</FormHelperText>
          )}
          <FormHelperText error={!!errors.hostname} />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Stack>
      </form>
    );

  return (
    <Chat
      username={username}
      hostname={hostname}
      onLogout={() =>
        setLoginInfo({
          username: "",
          hostname: "",
        })
      }
    />
  );
};
