import { AddToStockCardPayload, CreateCardPayload, FetchCardsResponse } from "@/types";
import authAxios from "./authAxios";


export const fetchCards=async()=>{
    const response=await authAxios.get<FetchCardsResponse>('/card');
    console.log(response.data);
    return response.data;
};


export const addNewCard=async(newCard:CreateCardPayload)=>{
    const response=await authAxios.post('/card',newCard);
    console.log(response.data);
    return response.data;
};

export const addToStockCard=async(addToStock:AddToStockCardPayload)=>{
    const response=await authAxios.patch('/card',addToStock);
    console.log(response.data);
    return response.data;
};
