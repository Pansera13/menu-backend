import  Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { get } from 'http';
import { CreateCategoryDTO } from './dto/create-category copy';
import { Category } from '../spots/spot.entity';
import { HTTP_CODE_METADATA } from '@nestjs/common/constants';

@Controller('categories')
export class CategoryController {
 
    constructor(private readonly service: CategoryService) {}

    @get()
    findAll() : Promise<Category[]> {

    }

    @get(':id')
    findOne(
        @Param('id', ParseUUIDPipe)
        id: string): Promise<Category> {
        return this.service.findOne(id);

    }

    @Post()
    create(
        @Body() 
        dto: CreateCategoryDTO): Promise<Category> {
        return this.service.create(dto);
    }

    @Patch(':id')
    update(dto: UpdateCategoryDTO): Promise<Category> {
    @Param('id', ParseUUIDPipe)
        id: string
        @Body()
        dto: UpdateCategoryDTO): Promise<Category> {
        return this.service.update(id,dto);
    }

    @Delete(':id')
    @httpCode(httpStatus.NO_CONTENT)
    remove(
        @Param('id', ParseUUIDPipe)
        id: string): Promise<void> {
        return this.service.remove(id);
    }
}