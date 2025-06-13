import { CreateSalesPointPayload, CreateSupplierPayload, FetchSalesPointsResponse, FetchSuppliersResponse, SalesPointReportResponse, SupplierReportResponse } from "@/types";
import authAxios from "./authAxios";


export const fetchSalesPoints=async(page:number,limit:number)=>{
    const response=await authAxios.get<FetchSalesPointsResponse>('/sales-point',{
      params: { page, limit }
    });
    console.log(response.data);
    return response.data;
};


export const fetchSalesPointReport= async (id: number,page: number, limit: number) => {
  const res=await authAxios.get<SalesPointReportResponse>(`/sales-point/${id}/report`,{
    params: { page, limit }
  });
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