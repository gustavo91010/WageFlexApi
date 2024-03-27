import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import Employer from 'src/contex/database/entities/employer.entity';
import EmployerDTO from 'src/domain/models/employer.dto';
import EmployerService from 'src/domain/service/employer.service';

@Controller('/employer')
export default class EmployerController {
  constructor(private readonly employerService: EmployerService) {}
  private readonly logger = new Logger(EmployerController.name);

  @Post()
  public async create(
    @Body() employerDto: EmployerDTO,
  ): Promise<{ employer: Employer }> {
    console.log('opa, cgegamso aqui...', employerDto)
    const response = await this.employerService.create(employerDto);
    this.logger.log('Create employer: ' + response.id);

    return {
      employer: response,
    };
  }

  @Get('/:id')
  public async findById(@Param('id') id: number): Promise<Employer> {
    return await this.employerService.findById(id);
  }
}
