export interface Session {
  id: string;
  username: string;
  clientType:"GUEST"|"SUBSCRIPER";
  startAt: string;
  endAt: string | null;
  isActive:boolean;

  // status: "open" | "closed";
  // orders: Order[];
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

export interface LoginResponse {
  token: string;
  user: User;
}