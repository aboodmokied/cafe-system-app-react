import { AddToStockCardPayload, CreateCardPayload, FetchCardsResponse, RemoveFromStockCardPayload } from "@/types";
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
    const response=await authAxios.patch('/card/add',addToStock);
    console.log(response.data);
    return response.data;
};

export const removeFromStockCard=async(removeFromStoke:RemoveFromStockCardPayload)=>{
    const response=await authAxios.patch('/card/remove',removeFromStoke);
    console.log(response.data);
    return response.data;
};

export const removeToStockCard=async(removeFromStock:RemoveFromStockCardPayload)=>{
    const response=await authAxios.patch('/card/remove',removeFromStock);
    console.log(response.data);
    return response.data;
};
