import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateCategoryDTO{
    @IsString()
    @IsNotEmpty()
    @MaxLength()
    name :string;
}