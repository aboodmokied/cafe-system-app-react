export interface Session {
  id: string;
  client: string;
  startTime: string;
  endTime: string | null;
  status: "open" | "closed";
  orders: Order[];
}

export interface Order {
  type: string;
  price: number;
}


export interface User{
    name:string;
    email:string;
    roles?:[]
}