import { Location } from "history";

export interface ILocationState {
  from?: Location;
  background?: Location;
};

export interface IIngredientData {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  qty?: number;
  uuid?: string;
}

export interface IRegistrationParams {
  email: string, 
  password: string, 
  name: string 
}

export interface ILoginParams {
  email: string; 
  password: string;
}

export interface IForgotPasswordParams {
  email: string; 
}

export interface IResetPasswordParams {
  password: string; 
  token: string; 
}

export interface IUserResponse {
  email: string;
  name: string;
}

export interface IUserUpdateParams extends IRegistrationParams {}

export interface IOrderParams {
  ingredients: Array<string>; 
}

// export interface IGetOrderParams {
//   id: Array<string>; 
// }

// export interface IGetOrderResponse {
//   order: IOrderData; 
// }

export interface IOrderData {
  _id: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name:string;
  ingredients: Array<string>;
  status?: string;
}

export interface IOrdersData {
  success: boolean;
  orders: Array<IOrderData>,
  total: number,
  totalToday: number,
}

export interface IOrderResponse {
  number: number; 
}

export interface IErrorResponse {
  status: number;
  message: string;
  stack: string;
}

export enum ORDER_STATUSES {
  DONE = 'done',
  PENDING = 'pending',
  CREATEDCrea = 'created',
  CANCEL = 'cancel'
}