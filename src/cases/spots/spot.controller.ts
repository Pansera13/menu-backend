import  Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { get } from 'http';
import { CreateSpotDTO } from './dto/create-category copy';
import { Spot } from './spot.entity';
import { HTTP_CODE_METADATA } from '@nestjs/common/constants';

@Controller('categories')
export class SpotController {
 
    constructor(private readonly service: SpotService) {}

    @get()
    findAll() : Promise<Spot[]> {

    }

    @get(':id')
    findOne(
        @Param('id', ParseUUIDPipe)
        id: string): Promise<Spot> {
        return this.service.findOne(id);

    }

    @Post()
    create(
        @Body() 
        dto: CreateSpotDTO): Promise<Spot> {
        return this.service.create(dto);
    }

    @Patch(':id')
    update(dto: UpdateSpotDTO): Promise<Spot> {
    @Param('id', ParseUUIDPipe)
        id: string
        @Body()
        dto: UpdateSpotDTO): Promise<Spot> {
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