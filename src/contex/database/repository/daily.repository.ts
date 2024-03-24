import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Daily from 'src/contex/database/entities/daily.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DailyRepository {
  constructor(
    @InjectRepository(Daily)
    private dailyRepository: Repository<Daily>,
  ) {}

  findAll(): Promise<Daily[]> {
    return this.dailyRepository.find();
  }

  findOne(id: number): Promise<Daily | null> {
    return this.dailyRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.dailyRepository.delete(id);
  }
  public opa(nome: string) {
    return `Opa ${nome}, tudo certo por ai???`;
  }
}
