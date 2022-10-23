import { IsNotEmpty, Length } from 'class-validator';

export class CreateEmployeeDto {
  username: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
}
