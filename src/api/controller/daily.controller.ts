import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import Daily from 'src/contex/database/entities/daily';
import CloseDailyDTO from 'src/domain/models/close.daily.dto';
import OpenDailyDTO from 'src/domain/models/open.daily.dto';
import DailyService from 'src/domain/service/daily.service';

@Controller('/daily')
export default class DailyController {
  constructor(private readonly dailyService: DailyService) {}
  private readonly logger = new Logger(DailyController.name);

  @Post()
  public async openDaly(
    @Body() dailyDto: OpenDailyDTO,
  ): Promise<{ openDaily: Daily }> {
    const daily = await this.dailyService.openDaily(dailyDto);
    this.logger.log('Create daily: ' + daily.id);

    return {
      openDaily: daily,
    };
  }
  @Get('/:nome')
  public opa(@Param('nome') nome: string) {
    return this.dailyService.opa(nome);
  }

  @Get('/:id')
  public async findById(@Param() id: number): Promise<Daily> {
    return await this.dailyService.findById(id);
  }

  @Put()
  public async closeDaly(@Body() closeDto: CloseDailyDTO): Promise<{
    success: boolean;
    message?: string;
    newDaily?: Daily;
  }> {
    const daily = await this.dailyService.closeDaily(closeDto);
    this.logger.log('Daily Closed: ' + daily);

    return {
      success: true,
      message: 'sono...',
    };
  }

  /*

  @Post()
  public async createCustuomer(@Body() createCustomerDTO: CreateCustomer): Promise<{ customer: Customers }> {
    this.logger.log('Create custumer: ', createCustomerDTO.id);
    const customer = await this.customersUserCase.create(createCustomerDTO);
    return {
      customer: customer
    }
    */
}
