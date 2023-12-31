import { FC, PropsWithChildren } from "react";
import { useLoginUser } from "./hooks/useLoginUser";
import { Navigate } from "react-router-dom";
import { routes } from "./Router";

export const LoginBlocker: FC<PropsWithChildren> = ({ children }) => {
  const { data, status } = useLoginUser();
  if (!data && status == "error") {
    console.log("page blocked");
    return <Navigate to={routes.login} />;
  }
  return <>{children}</>;
};
