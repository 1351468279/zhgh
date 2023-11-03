import { http, request, requestRows } from "@/utils/http";
import type { currentUserInfo } from "@/types/myinfo";

export const getCurrentUserInfo = () => {
  return request<currentUserInfo>({
    method: "GET",
    url: "/zzhygl/api/individual.page",
  });
};
