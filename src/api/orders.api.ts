import { AddOtherOrderPayload, FetchOrdersResponse } from "@/types"
import authAxios from "./authAxios"


export const fetchOrders=async(sessionId:number)=>{
    const response=await authAxios.get<FetchOrdersResponse>(`/order/${sessionId}`);
    console.log(response.data);
    return response.data;
};


export const addOtherOrder = async (newOrder:AddOtherOrderPayload) => {
  const response = await authAxios.post('/order', newOrder)
  console.log(response.data);
  return response.data
}