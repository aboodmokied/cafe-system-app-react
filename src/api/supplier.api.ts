import { CreateSupplierPayload, FetchSuppliersResponse, SupplierReportResponse } from "@/types";
import authAxios from "./authAxios";


export const fetchSuppliers=async()=>{
    const response=await authAxios.get<FetchSuppliersResponse>('/supplier');
    console.log(response.data);
    return response.data;
};


export const fetchSupplierReport= async (id: number) => {
  const res=await authAxios.get<SupplierReportResponse>(`/supplier/${id}/report`);
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