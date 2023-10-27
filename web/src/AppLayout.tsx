import { FC, useCallback } from "react";
import { Layout } from "./Layout";
import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { userApi } from "./api";
import e from "express";
import { isAxiosError } from "axios";
import { useLoginUser } from "./hooks/useLoginUser";
import { useQueryClient } from "@tanstack/react-query";
import { arrayBufferToBase64 } from "./utils/arrayBufferToBase64";

const VAPID_PUBLIC_KEY =
  "BOEhiGHpSfyAmoGU_Kg7H8EQqZ6TfkvyyG98S5nh-4omLebX5fsCDup9ORt4LZaVyYVJy8flLYYnTS-FOUSc92Q";

const registerWebPush = async () => {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: VAPID_PUBLIC_KEY,
      });
      console.log("User is subscribed:", subscription);

      const p256dh = subscription.getKey("p256dh");
      const auth = subscription.getKey("auth");
      console.log({ p256dh, auth });
      // このsubscriptionオブジェクトをサーバーに送信して保存します。
      // 保存することで、後でこのユーザーにPush通知を送信する際に使用します。
      await userApi.userControllerSubscribe({
        endpoint: subscription.endpoint,
        expirationTime: subscription.expirationTime?.toString() ?? null,
        keys: {
          p256dh: arrayBufferToBase64(p256dh) ?? undefined,
          auth: arrayBufferToBase64(auth) ?? undefined,
        },
      });
    } catch (error) {
      console.error("Failed to subscribe the user: ", error);
    }
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
