import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto, CreateOrderItemDto } from "./dto/create-order";
import { updateOrderStatusDto } from "./dto/update-order-status";
import { Order, OrderStatus } from "./entities/order-entity";
import { OrderItem } from "./entities/order-item.entity";
import { GuestCheckService } from "../guest-checks/guest-check.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductService } from "../products/product.service";

@Injectable()
export class OrderService {
  constructor(
    private readonly guestCheckService: GuestCheckService,
    private readonly productService: ProductService,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>
  ) {}

  private async prepareItems(dto: CreateOrderItemDto): Promise<OrderItem> {
    const product = await this.productService.findOne(dto.productId);
    const price = Number(product.price);
    const subtotal = dto.quantity * price;

    return this.orderItemRepository.create({
      product,
      quantity: dto.quantity,
      price,
      subtotal,
    });
  }

  async create(dto: CreateOrderDto): Promise<Order> {
    const guestCheck = await this.guestCheckService.findOrCreateOpened(dto.spotId);

    const items: OrderItem[] = [];
    let total = 0;

    for (const itemDto of dto.items) {
      const item = await this.prepareItems(itemDto);
      items.push(item);
      total += Number(item.subtotal);
    }

    const order = this.orderRepository.create({
      guestCheck,
      status: OrderStatus.NEW,
      total,
      items,
    });

    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOneBy({ id });

    if (!order) {
      throw new NotFoundException("Pedido não encontrado!");
    }

    return order;
  }

  async updateStatus(id: string, dto: updateOrderStatusDto): Promise<Order> {
    const order = await this.findOne(id);

    // sequência obrigatória de mudança de status
    const nextStatus: Record<OrderStatus, OrderStatus | undefined> = {
      [OrderStatus.NEW]: OrderStatus.PREPARING,
      [OrderStatus.PREPARING]: OrderStatus.READY,
      [OrderStatus.READY]: OrderStatus.DELIVERY,
      [OrderStatus.DELIVERY]: undefined,
    };

    // verifico se o client esta definindo um status valido
    const expected = nextStatus[order.status];

    if (dto.status !== expected) {
      throw new BadRequestException('Status inválido');
    }

    // forço a mudança de status
    order.status = dto.status;

    // grava alteração no banco
    return this.orderRepository.save(order);
  }
}
