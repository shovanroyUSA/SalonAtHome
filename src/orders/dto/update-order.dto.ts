import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber()
  readonly clientID?: number;

  @IsOptional()
  @IsNumber()
  readonly serviceID?: number;

  @IsOptional()
  @IsNumber()
  readonly staffID?: number;

  @IsOptional()
  @IsString()
  readonly date?: string;

  @IsOptional()
  @IsString()
  readonly time?: string;

  @IsOptional()
  @IsString()
  readonly status?: string;

  @IsOptional()
  @IsString()
  readonly notes?: string;
}
