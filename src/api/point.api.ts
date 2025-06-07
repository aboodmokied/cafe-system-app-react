import { CreateSalesPointPayload, CreateSupplierPayload, FetchSalesPointsResponse, FetchSuppliersResponse, SalesPointReportResponse, SupplierReportResponse } from "@/types";
import authAxios from "./authAxios";


export const fetchSalesPoints=async()=>{
    const response=await authAxios.get<FetchSalesPointsResponse>('/sales-point');
    console.log(response.data);
    return response.data;
};


export const fetchSalesPointReport= async (id: number) => {
  const res=await authAxios.get<SalesPointReportResponse>(`/sales-point/${id}/report`);
  console.log(res.data)
  return res.data;
};



export const addNewSalesPoint=async(newPoint:CreateSalesPointPayload)=>{
    const response=await authAxios.post('/sales-point',newPoint);
    console.log(response.data);
    return response.data;
};


export const pointBillingPayment = async (billingPayment:{pointBillingId:number,amount:number}) => {
  const res=await authAxios.post(`/point-billing/payment`,billingPayment);
  console.log(res.data)
  return res.data;
};