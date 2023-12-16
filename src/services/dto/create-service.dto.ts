import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  readonly serviceName: string;

  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsOptional()
  @IsString()
  image: string;
}
