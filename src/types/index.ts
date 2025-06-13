export interface Session {
  id: number;
  username: string;
  clientType:string;
  startAt: string;
  endAt: string | null;
  isActive:boolean;
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

export interface Subscriper {
  id:number;
  username:string;
  phone:string;
  email:string;
  type: 'monthly'|'weekly';
}


export interface SubscriperReport extends Subscriper{
  billings:Billing[],
  subscriperTotalAmount:number
}

export interface SubscriperReportResponse{
  subscriper:SubscriperReport;
  pagination:Pagination
}

export interface Billing{
  id:number;
  subscriperId:number;
  startDate:Date;
  endDate:Date;
  type: 'weekly' | 'monthly';
  isPaid: boolean;
  sessions?:Session[];
  totalAmount:number;
  paidAmount:number;
  subscriper?:Subscriper
}

export interface PointBilling{
  id:number;
  pointId:number;
  date:Date;
  isPaid: boolean;
  totalAmount:number;
  paidAmount:number;
  salesPoint?:SalesPoint;
  cardsCount: number;
  card: Card;
}

export interface Supplier {
  id:number;
  name:string;
  phone:string;
}

export interface SalesPoint {
  id:number;
  name:string;
  phone:string;
}

// export interface PointBilling {
//   id: number;
//   date: string;
//   isPaid: boolean;
//   totalAmount: number;
//   paidAmount: number;
//   cardsCount: number;
//   card: Card;
// }
export interface SupplierBilling {
  id: number;
  date: Date;
  supplierId:number;
  supplier:Supplier;
  isPaid: boolean;
  totalAmount: number;
  paidAmount: number;
  cardsCount: number;
  card: Card;
}

export interface Expenses{
  id: number;
  type: "SUPPLIER";
  userId: number;
  amount: number;
  date: string;
  supplierExpenses?:SupplierExpenses;
}

export interface SupplierExpenses{
  id: number;
  supplierId: number;
  supplierBillingId: number;
}

export interface SupplierReport extends Supplier{
  supplierBillings:SupplierBilling[],
  supplierTotalAmount:number
}

export interface SupplierReportResponse{
  supplier:SupplierReport;
  pagination:Pagination
}

export interface SalesPointReport extends SalesPoint{
  pointBillings:PointBilling[],
  pointTotalAmount:number
}
export interface SalesPointReportResponse{
  salesPoint:SalesPointReport;
  pagination:Pagination
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


export interface Revenue{
  id:number;
  type:'GUEST'|'SUBSCRIPER'|'POINT';
  amount:number;
  date:Date
  userId?:number;
  subscriperRevenue?:SubscriperRevenue;
  guestRevenue?:GuestRevenue;
}

export interface SubscriperRevenue{
  type:'SUBSCRIPER';
  subscriperId:number,
  billingId:number,
}

export interface GuestRevenue{
  username:string;
  sessionId:number;
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


export interface AddToStockCardPayload{
  cardId:number;
  supplierId:number;
  qty:number;
  totalPrice:number;
  paidPrice: number;
}

export interface RemoveFromStockCardPayload{
  cardId:number;
  pointId:number;
  qty:number;
  totalPrice:number;
  paidPrice: number;
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
export interface FetchSuppliersResponse{
  suppliers:Supplier[],
  pagination:Pagination
}
interface Pagination{
  page:number,
  limit:number,
  totalPages:number,
}
export interface FetchSalesPointsResponse{
  salesPoints:SalesPoint[],
  pagination:Pagination
  
}
export interface FetchSupscripersResponse{
  subscripers:Subscriper[],
  pagination:Pagination
}
export interface FetchRevenuesResponse{
  revenues:Revenue[];
  pagination:Pagination
  totalAmount:number,
  startDate:string,
  endDate:string
}
export interface FetchExpensesResponse{
  expenses:Expenses[];
  totalAmount:number,
  startDate:string,
  endDate:string,
  pagination:Pagination
}


export interface FetchRevenuesPayload{
  startDate:Date;
  endDate?:Date;
}

export interface FetchExpensesPayload{
  startDate:Date;
  endDate?:Date;
}

export interface CreateCardPayload{
  label:string;
  price:number;
  speed?:string;
  hours:number;
  qty?:number;
}

export interface CreateSubscriperPayload{
  username:string;
  email:string;
  phone:string;
  type: 'monthly'|'weekly';
}

export interface CreateGuestSessionPayload{
  username:string;
  clientType:'GUEST';
}

export interface CreateSubscriperSessionPayload{
  username:string;
  subscriperId:number;
  clientType:'SUBSCRIPER';
}

export interface CreateSupplierPayload{
  name:string;
  phone:string;
}

export interface CreateSalesPointPayload{
  name:string;
  phone:string;
}

