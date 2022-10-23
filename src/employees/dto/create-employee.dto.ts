import { IsNotEmpty, Length, IsOptional } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @Length(5)
  username: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
}
