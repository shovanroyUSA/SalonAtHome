import { IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class UpdateServiceDto {
  @IsString()
  @IsOptional()
  readonly serviceName?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly price?: number;

  @IsOptional()
  @IsString()
  image?: string;
}
