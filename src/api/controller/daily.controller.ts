import { Controller, Get } from '@nestjs/common';
import DailyService from 'src/domain/service/daily.service';

@Controller('/daily')
export default class DailyController {
  constructor(private readonly dailyService: DailyService) {}

  @Get()
  public opa(nome: string) {
    return this.dailyService.opa(nome);
  }
}
