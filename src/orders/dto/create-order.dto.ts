import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  readonly clientID: number;

  @IsNotEmpty()
  @IsNumber()
  readonly serviceID: number;

  @IsNotEmpty()
  @IsNumber()
  readonly staffID: number;

  @IsNotEmpty()
  @IsString()
  readonly date: string;

  @IsOptional()
  @IsString()
  readonly time: string;

  @IsOptional()
  @IsString()
  readonly status?: string;

  @IsOptional()
  @IsString()
  readonly notes?: string;
}
