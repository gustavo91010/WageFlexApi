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
import { AttDailyDto } from 'src/domain/models/att.daily.dto';
import DailyService from 'src/domain/service/daily.service';

@Controller('/daily')
export default class DailyController {
  constructor(private readonly dailyService: DailyService) {}
  private readonly logger = new Logger(DailyController.name);

  @Post()
  public async openDaly(
    @Body() dailyDto: OpenDailyDTO,
  ): Promise<{ message: string; openDaily: Daily }> {
    try {
      const daily = await this.dailyService.openDaily(dailyDto);
      return {
        message: `Daily: ${daily.id}, Employer: ${dailyDto.employer_id}, Provider: ${dailyDto.provider_id}`,
        openDaily: daily,
      };
    } catch (error) {
      return {
        message: error.message,
        openDaily: null,
      };
    }
  }

  @Get('/:id')
  public async findById(@Param('id') id: number): Promise<Daily> {
    return await this.dailyService.findById(id);
  }

  @Put('/att/:id')
  public async attDaily(
    @Param('id') id: number,
    @Body() closeDto: AttDailyDto,
  ): Promise<{
    success: boolean;
    message?: string;
    newDaily?: Daily;
  }> {
    const daily = await this.dailyService.attDaily(id, closeDto);
    this.logger.log('Daily Closed: ' + daily);

    return {
      success: daily.success,
      newDaily: daily.newDaily,
    };
  }
  @Put('/close/:id')
  public async closeDaly(
    @Param('id') id: number,
    @Body() closeDto: CloseDailyDTO,
  ): Promise<{
    success: boolean;
    message?: string;
    newDaily?: Daily;
  }> {
    const daily = await this.dailyService.closeDaily(id, closeDto);
    this.logger.log('Daily Closed: ' + daily);
    return {
      success: daily.success,
      message: daily.message,
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
