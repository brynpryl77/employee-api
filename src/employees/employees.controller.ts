import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Controller, Post, Put, Get, Request, Body, Param, Delete, UseGuards } from "@nestjs/common";
import { EmployeeService } from "./employees.service";
import { Employee } from "./entities/employee.entity"

// the @Controller() decorator function will instruct Nestjs
// to add a route of `/greet`
@UseGuards(JwtAuthGuard)
@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Get()
  findAll(@Request() req): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.employeeService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @Request() req,
  ) {
    console.log('inside put')
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.employeeService.remove(+id);
  }
}