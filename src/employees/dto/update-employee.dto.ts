import { IsOptional, Length, IsNotEmpty } from 'class-validator';

export class UpdateEmployeeDto {
    username: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    website: string;
}
