import { CreateGuestSessionPayload, CreateSubscriperSessionPayload, FetchSessionsResponse, Session } from "@/types";
import authAxios from "./authAxios";

export const fetchSessions=async(page:number,limit:number,status='open')=>{
    const res=await authAxios.get<FetchSessionsResponse>('session',{
      params:{
        page,
        limit,
        status
      }
    });
    console.log(res.data);
    return res.data;
};

export const openNewSession = async (newSession:CreateGuestSessionPayload|CreateSubscriperSessionPayload) => {
  const response = await authAxios.post('/session', newSession)
  return response.data
}


