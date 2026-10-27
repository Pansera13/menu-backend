import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order-entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderItem } from './entities/order-item.entity';
import { GuestCheckModule } from '../guest-checks/guest-check.module';
import { ProductModule } from '../products/product.module';
import { Product } from '../products/product.entity';
import { GuestCheck } from '../guest-checks/guest-check.entity';

@Module({
  imports: [
    ProductModule,
    GuestCheckModule,
    TypeOrmModule.forFeature([GuestCheck, Product, Order, OrderItem]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
