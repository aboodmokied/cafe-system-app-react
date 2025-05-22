import { CreateSupplierPayload, FetchSuppliersResponse } from "@/types";
import authAxios from "./authAxios";


export const fetchSuppliers=async()=>{
    const response=await authAxios.get<FetchSuppliersResponse>('/supplier');
    console.log(response.data);
    return response.data;
};


export const addNewSupplier=async(newSupplier:CreateSupplierPayload)=>{
    const response=await authAxios.post('/supplier',newSupplier);
    console.log(response.data);
    return response.data;
};
