export interface Session {
  id: number;
  username: string;
  clientType:string;
  startAt: string;
  endAt: string | null;
  isActive:boolean;
  // orders: Order[];
}

export interface User{
  name:string;
  email:string;
  roles?:[]
}

export interface Card{
  id:number;
  label:string;
  price:number;
  qty:number;
  hours:number;
  speed?:string;
}


export interface Order {
  id: number;
  sessionId: number;
  type: 'CARD' | 'CHARGING' | 'OTHER';
  session: Session;
  price?:number
  cardOrder?: CardOrder;
  chargingOrder?: ChargingOrder;
  otherOrder?: OtherOrder;
}

export interface CardOrder{
  id: number;
  cardId: number;
  // price:number;
}
export interface ChargingOrder{
  id:number;
  durationMinutes?: number;
  // price: number;
  startAt: Date;
  endAt: Date;
}

export interface OtherOrder{
  id:number;
  title:string;
  // price:number;
}

export interface AddOtherOrderPayload{
  sessionId:number;
  type:'OTHER';
  title:string;
  price:number;
}
export interface AddCardOrderPayload{
  sessionId:number;
  type:'CARD';
  cardId:number;
}
export interface AddChargingOrderPayload{
  sessionId:number;
  type:'CHARGING';
}
export interface stopChargingOrderPayload{
  orderId:number;
  price:number;
  endAt:Date
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

export interface FetchOrdersResponse{
  orders:Order[]
}
export interface FetchCardsResponse{
  cards:Card[]
}


export interface CreateCardPayload{
  label:string;
  price:number;
  speed?:string;
  hours:number;
  qty?:number;
}