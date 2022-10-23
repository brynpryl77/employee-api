import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {

    constructor(
        @Inject('EMPLOYEE_REPOSITORY')
        private employeeRepository: Repository<Employee>,
    ) { }

    async onModuleInit() {

        const initialEmployees = [
            {
                id: 15,
                name: "Jacky Villar",
                username: "jvillar102",
                email: "jvillar102@gmail.com",
                phone: "+639333938576",
                website: "https://javison.info",
                address: "Tatalon Quezon City"
            },
            {
                id: 17,
                name: "Cynthia Chan",
                username: "cchan",
                email: "cynthiachan19654@gmail.com",
                phone: "+639343657360",
                website: "https://mereoadcad.com.ph",
                address: "Miranda Mandaluyong City"
            },
            {
                id: 18,
                name: "Percy Flores",
                username: "bunians23",
                email: "nixtepa225@gmail.com",
                phone: "+6398459648678",
                website: "https://derrissxudy.xxy",
                address: "Solis Pasig City"
            },
            {
                id: 19,
                name: "Jade Lapid",
                username: "ablewan23",
                email: "nurrahble23@gmail.com",
                phone: "+639485760938",
                website: "https://gremjikx.sap",
                address: "Cuevas Boni City"
            },
            {
                id: 21,
                name: "Ramon Ang",
                username: "kaRamons65",
                email: "mexmireia385@gmail.com",
                phone: "+639578674639",
                website: "https://brenxsison.xyz",
                address: "Plaridel Bulacan"
            },
            {
                id: 23,
                name: "Jinky Sajes",
                username: "jinkysajes",
                email: "j_sajes1993@yahoo.com",
                phone: "+639345847365",
                website: "https://wilkotxy.com",
                address: "Karuhatan Quezon City"
            },
            {
                id: 25,
                name: "Bryan Espanto",
                username: "mikmaydey1293",
                email: "mikmaydey1293@gmail.com",
                phone: "+639485947394",
                website: "https://jeradaseu.com",
                address: "San Jose Bulacan"
            },
        ];

        await this.employeeRepository.save(initialEmployees);
    }

    async create(createEmployeeDto: CreateEmployeeDto) {
        const employee = new Employee();
        employee.name = createEmployeeDto.name;
        employee.email = createEmployeeDto.email;
        employee.phone = createEmployeeDto.phone;
        employee.address = createEmployeeDto.address;
        employee.website = createEmployeeDto.website;

        employee.username = createEmployeeDto.username;

        return this.employeeRepository.save(employee);
    }

    async findAll(): Promise<Employee[]> {
        return this.employeeRepository.find({
            order: {
                id: 'DESC',
            },
        });
    }

    async findOne(id: number) {
        return this.employeeRepository.findOne({ id });
    }

    async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
        console.log('inside update')
        console.log(updateEmployeeDto)
        let employee = await this.employeeRepository.findOne({
            id,
        });
        if (!employee) {
            throw new HttpException('Resource not found.', HttpStatus.NOT_FOUND);
        }

        employee.name = updateEmployeeDto.name ?? employee.name;
        employee.username = updateEmployeeDto.username ?? employee.username;
        employee.email = updateEmployeeDto.email ?? employee.email;
        employee.phone = updateEmployeeDto.phone ?? employee.phone;
        employee.address = updateEmployeeDto.address ?? employee.address;
        employee.website = updateEmployeeDto.website ?? employee.website;

        await this.employeeRepository.save(employee);

        return employee;
    }

    async remove(id: number) {
        const employee = await this.employeeRepository.findOne({
            id,
        });
        if (!employee) {
            throw new HttpException('Resource not found.', HttpStatus.NOT_FOUND);
        }

        await this.employeeRepository.remove(employee);

        return { ...employee, id };
    }
}
