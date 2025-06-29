import {  CreateSubscriperPayload, FetchSupscripersResponse, Subscriper, SubscriperReportResponse } from "@/types";
import authAxios from "./authAxios";





export const fetchSubscribers = async (page: number, limit: number, q?: string) => {
  const res = await authAxios.get<FetchSupscripersResponse>(`/subscriper`, {
    params: { page, limit, q },
  });
  console.log(res.data);
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



export const fetchSubscriperReport= async (id: number,page:number,limit:number) => {
  const res=await authAxios.get<SubscriperReportResponse>(`/subscriper/${id}/report`,{
    params: { page, limit }
  });
  console.log(res.data)
  return res.data;
};

export const billingPayment = async (billingPayment:{billingId:number,amount:number}) => {
  const res=await authAxios.post(`/billing/payment`,billingPayment);
  console.log(res.data)
  return res.data;
};


