import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { FC } from "react";
import { Chat } from "./Chat";
import { Layout } from "./Layout";

export const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
