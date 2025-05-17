import { FetchSessionsResponse, Session } from "@/types";
import authAxios from "./authAxios";

export const fetchSessions=async()=>{
    const res=await authAxios.get<FetchSessionsResponse>('session');
    return res.data;
};

export const openNewSession = async (newSession:Pick<Session,"username"|"clientType">) => {
  const response = await authAxios.post('/session', newSession)
  return response.data
}


