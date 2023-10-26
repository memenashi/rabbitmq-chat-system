import { FC, useCallback } from "react";
import { Layout } from "./Layout";
import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { userApi } from "./api";
import e from "express";
import { isAxiosError } from "axios";
import { useLoginUser } from "./hooks/useLoginUser";
import { useQueryClient } from "@tanstack/react-query";

const VAPID_PUBLIC_KEY =
  "BEY2KR_22xD0gCtpctWnvehAyYAADw9ss_m1bT2Z8FUPmp650pi2cwL064JL6rg4PKrs9hiUg_JNiItUiG6gyQQ";

const registerWebPush = async () => {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: VAPID_PUBLIC_KEY,
        })
        .then(function (subscription) {
          console.log("User is subscribed:", subscription);

          // このsubscriptionオブジェクトをサーバーに送信して保存します。
          // 保存することで、後でこのユーザーにPush通知を送信する際に使用します。
          // sendSubscriptionToServer(subscription);
          userApi.userControllerSubscribe({
            endpoint: subscription.endpoint,
            expirationTime: subscription.expirationTime?.toString() ?? null,
            keys: {
              p256dh: (subscription.getKey("p256dh") as any) ?? undefined,
              auth: (subscription.getKey("auth") as any) ?? undefined,
            },
          });
        })
        .catch(function (error) {
          console.error("Failed to subscribe the user: ", error);
        });
    });
  }
};

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
            <Stack direction="row">
              <Button onClick={handleLogout}>Logout</Button>
              <Button onClick={registerWebPush}>Push</Button>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Outlet />
    </Layout>
  );
};
