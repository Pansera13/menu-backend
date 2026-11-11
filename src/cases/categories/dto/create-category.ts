import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCategoryDTO{
    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    name :string;

    @IsOptional()
    @IsString()
    icon?: string;
}