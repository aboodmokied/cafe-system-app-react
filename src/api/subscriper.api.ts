import { CreateGuestSessionPayload, CreateSubscriperSessionPayload, FetchSessionsResponse, Session, Subscriper } from "@/types";
import authAxios from "./authAxios";





export const fetchSubscriberByName = async (username: string) => {
  const res=await authAxios.get<{subscriper:Subscriper}>(`subscriper/${username}`);
  console.log(res.data)
  return res.data;
};