import { OrderStatus } from "../entities/order-entity";
import { IsEnum } from "class-validator";


export class updateOrderStatusDto {
    @IsEnum(OrderStatus)
    status: OrderStatus;
}