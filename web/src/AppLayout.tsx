import { FC, useCallback } from "react";
import { Layout } from "./Layout";
import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { userApi } from "./api";
import e from "express";
import { isAxiosError } from "axios";
import { useLoginUser } from "./hooks/useLoginUser";

export const AppLayout: FC = () => {
  const nav = useNavigate();
  const { refetch } = useLoginUser();
  const handleLogout = useCallback(
    () =>
      userApi
        .userControllerLogout()
        .then(() => {
          refetch();
          nav("/login");
        })
        .catch((e: { response: any }) => {
          if (isAxiosError(e)) {
            refetch();
            e.response.status === 401
              ? nav("/login")
              : console.log(e.response.status);
          }
        }),
    [],
  );
  return (
    <Layout>
      <AppBar>
        <Toolbar>
          <Stack direction="row" justifyContent="space-between" width="100%">
            <Typography variant="h4">Rabbit-Chat</Typography>
            <Button onClick={handleLogout}>Logout</Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Outlet />
    </Layout>
  );
};
