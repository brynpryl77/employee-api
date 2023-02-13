import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  Length,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsEmail,
  IsUrl,
} from 'class-validator';

export class UpdateEmployeeDto {
  @ApiProperty({ minLength: 2, maxLength: 100 })
  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ minLength: 3, maxLength: 20 })
  @MinLength(3)
  @MaxLength(20)
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: 'email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @ApiProperty({ required: false, minLength: 6, maxLength: 15 })
  @MinLength(6)
  @MaxLength(15)
  phone: string;

  @ApiProperty({ required: false, minLength: 3, maxLength: 500 })
  @IsOptional()
  @MinLength(3)
  @MaxLength(500)
  address: string;

  @ApiProperty({ required: false, type: 'url' })
  @IsOptional()
  @IsUrl()
  website: string;
}
