import { CreateCardPayload, FetchCardsResponse } from "@/types";
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
