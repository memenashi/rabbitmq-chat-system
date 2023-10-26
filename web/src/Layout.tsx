import { styled } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

const Background = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: "100vh",
  width: "100vw",
}));

export const Layout: FC<Partial<PropsWithChildren>> = ({ children }) => (
  <Background>{children ?? <Outlet />}</Background>
);
