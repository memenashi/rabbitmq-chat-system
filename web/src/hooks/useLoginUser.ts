import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api";

export const useLoginUser = () =>
  useQuery({
    queryKey: ["loginUser"],
    queryFn: userApi.userControllerInfo,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
