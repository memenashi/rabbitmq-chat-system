import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { FC } from "react";
import { Chat } from "./Chat";
import { Layout } from "./Layout";
import { Register } from "./Register";
import { LoginBlocker } from "./LoginBlocker";
import { AppLayout } from "./AppLayout";

export const routes = {
  login: "/login",
  chat: "/",
  register: "/register",
};

export const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.login}
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <LoginBlocker>
              <AppLayout />
            </LoginBlocker>
          }
        >
          <Route index element={<Chat />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
