import { Repository } from 'typeorm';
import { Products } from '../categories/product.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find({
      order: { name: 'ASC' },
      relations: { category: true },
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      relations: { category: true },
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Categoria não encontrada!');
    }

    return product;
  }

  create(dto: CreateProductDto): Promise<Product> {

    //10-20
    //const category

    const product = this.productRepository.create({
      name: dto.name.trim(),
      description: dto.description?.trim(),
      price: dto.price,
      picture: dto.picture,
      active: true,
    });

    return this.productRepository.save(product);
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    if (dto.name !== undefined) {
      product.name = dto.name;
    }

    if (dto.active !== undefined) {
      product.active = dto.active;
    }

    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);

    await this.productRepository.remove(product);
  }

  private async getActiveCategory(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({
      id,
      active: true,
    });

    if (!category) {
      throw new NotFoundException('Nenhuma categoria ativa foi encontrada');
    }

    return category;
  }

}