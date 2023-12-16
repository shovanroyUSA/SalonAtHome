import { IsOptional, IsDateString, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UpdateStaffMemberDto {
  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  readonly lastName?: string;

  @IsOptional()
  @IsDateString()
  readonly dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  readonly gender?: string;

  @Exclude()
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  readonly phone?: string;

  @IsOptional()
  @IsString()
  readonly address?: string;

  @IsOptional()
  @IsString()
  readonly specialization?: string;

  @IsOptional()
  @IsString()
  readonly bio?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
