import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateSpotDTO{
    @IsString()
    @IsNotEmpty()
    
    @MaxLength()
    name :string;
}