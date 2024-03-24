import { Injectable } from '@nestjs/common';
import { DailyRepository } from 'src/contex/database/repository/daily.repository';

@Injectable()
export default class DailyService {
  constructor(private readonly dailyRepository: DailyRepository) {}

  public opa(nome: string) {
    return this.dailyRepository.opa(nome);
  }
}
