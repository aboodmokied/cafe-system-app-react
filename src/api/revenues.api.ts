import { FetchRevenuesPayload, FetchRevenuesResponse } from "@/types";
import authAxios from "./authAxios";


export const fetchRevenueReport=async(fetchRevenuesPayload:FetchRevenuesPayload)=>{
    const {startDate,endDate}=fetchRevenuesPayload;
    const params: Record<string, Date> = {
        startDate: startDate,
        ...(endDate ? { endDate: endDate } : {})
    };
    const response=await authAxios.get<FetchRevenuesResponse>(`/revenue`,{params});
    console.log(response.data);
    return response.data;
};

// export const addOtherOrder = async (newOrder:AddOtherOrderPayload) => {
//   const response = await authAxios.post('/revenues', newOrder)
//   console.log(response.data);
//   return response.data
// }