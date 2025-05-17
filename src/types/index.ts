export interface Session {
  id: string;
  username: string;
  clientType:string;
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


export interface FetchSessionsResponse{
  sessions:Session[]
}

export interface AddSessionsResponse{
  sessions:Session
}