import { AddChargingOrderPayload, AddOtherOrderPayload, FetchOrdersResponse, stopChargingOrderPayload } from "@/types"
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

export const addChargingOrder = async (newOrder:AddChargingOrderPayload) => {
  const response = await authAxios.post('/order', newOrder)
  console.log(response.data);
  return response.data
}

export const stopChargingOrder = async (stopCharging:stopChargingOrderPayload) => {
  console.log({stopCharging})
  const response = await authAxios.patch('/order/stop-charging', stopCharging)
  console.log(response.data);
  return response.data
}