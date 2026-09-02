import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

type Product = {
  id?: string;
  name?: string;
  [key: string]: unknown;
};

type CreateCategoryDTO = {
  name?: string;
  [key: string]: unknown;
};

type UpdateCategoryDTO = Partial<CreateCategoryDTO>;

interface CategoryService {
  findAll(): Promise<Product[]>;
  findOne(id: string): Promise<Product>;
  create(dto: CreateCategoryDTO): Promise<Product>;
  update(id: string, dto: UpdateCategoryDTO): Promise<Product>;
  remove(id: string): Promise<void>;
}

@Controller('products')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateCategoryDTO): Promise<Product> {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body()
    dto: UpdateCategoryDTO,
  ): Promise<Product> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.service.remove(id);
  }
}