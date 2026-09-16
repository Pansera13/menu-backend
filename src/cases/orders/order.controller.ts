import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order';
import { updateOrderStatusDto } from './dto/update-order-status';
import { Order } from './entities/order-entity';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post()
  create(@Body() dto: CreateOrderDto): Promise<Order> {
    return this.service.create(dto);
  }

  @Get()
  findAll(): Promise<Order[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    return this.service.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: updateOrderStatusDto,
  ): Promise<Order> {
    return this.service.updateStatus(id, dto);
  }
}