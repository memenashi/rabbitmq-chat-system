import { FC, useCallback } from "react";
import { Layout } from "./Layout";
import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { userApi } from "./api";
import e from "express";
import { isAxiosError } from "axios";
import { useLoginUser } from "./hooks/useLoginUser";
import { useQueryClient } from "@tanstack/react-query";

export const AppLayout: FC = () => {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const { refetch } = useLoginUser();
  const handleLogout = useCallback(async () => {
    try {
      await userApi.userControllerLogout();
    } catch (e) {}
    queryClient.clear();
    nav("/login");
  }, [refetch, nav]);
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
