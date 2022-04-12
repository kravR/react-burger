import { IOrderData } from "../services/types/data"

export const sortOrderByDate = (a: IOrderData, b: IOrderData) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();