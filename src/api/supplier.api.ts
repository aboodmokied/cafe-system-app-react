import { CreateSupplierPayload, FetchSuppliersResponse, SupplierReportResponse } from "@/types";
import authAxios from "./authAxios";


export const fetchSuppliers=async(page:number,limit:number,q?:string)=>{
    const response=await authAxios.get<FetchSuppliersResponse>('/supplier',{
      params: { page, limit,q }
    });
    console.log(response.data);
    return response.data;
};


export const fetchSupplierReport= async (id: number,page:number,limit:number) => {
  const res=await authAxios.get<SupplierReportResponse>(`/supplier/${id}/report`,{
    params: { page, limit }
  });
  console.log(res.data)
  return res.data;
};



export const addNewSupplier=async(newSupplier:CreateSupplierPayload)=>{
    const response=await authAxios.post('/supplier',newSupplier);
    console.log(response.data);
    return response.data;
};


export const supplierBillingPayment = async (billingPayment:{supplierBillingId:number,amount:number}) => {
  const res=await authAxios.post(`/supplier-billing/payment`,billingPayment);
  console.log(res.data)
  return res.data;
};