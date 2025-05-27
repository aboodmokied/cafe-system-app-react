import {  CreateSubscriperPayload, FetchSupscripersResponse, Subscriper } from "@/types";
import authAxios from "./authAxios";





export const fetchSubscribers = async () => {
  const res=await authAxios.get<FetchSupscripersResponse>(`/subscriper`);
  console.log(res.data)
  return res.data;
};

export const createSubscriper = async (newSubscriper:CreateSubscriperPayload) => {
  const res=await authAxios.post(`/subscriper`,newSubscriper);
  console.log(res.data)
  return res.data;
};

export const fetchSubscriberByName = async (username: string) => {
  const res=await authAxios.get<{subscriper:Subscriper}>(`/subscriper/${username}`);
  console.log(res.data)
  return res.data;
};