import { Module } from '@nestjs/common';
import { EmployeeService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { DatabaseModule } from 'src/database/database.module';
import { employeeProviders } from './providers/employee.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeesController],
  providers: [...employeeProviders, EmployeeService],
})
export class EmployeeModule {}