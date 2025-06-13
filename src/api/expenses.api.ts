

import { FetchExpensesPayload, FetchExpensesResponse } from "@/types";
import authAxios from "./authAxios";


export const fetchExpensesReport=async(fetchRevenuesPayload:FetchExpensesPayload,page:number,limit:number)=>{
    const {startDate,endDate}=fetchRevenuesPayload;
    const params: Record<string, Date> = {
        startDate: startDate,
        ...(endDate ? { endDate: endDate } : {})
    };
    const response=await authAxios.get<FetchExpensesResponse>(`/expenses`,{
        params:{
            ...params,
            page,
            limit
        }
    });
    console.log(response.data);
    return response.data;
};
