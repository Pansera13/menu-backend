import {
  IsNotEmpty,
  MaxLength,
  IsString,
  IsOptional,
  IsNumber,
  IsUUID,
  Min,
  IsBoolean,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  picture: string;
}
