import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Daily from 'src/contex/database/entities/daily';
import { Repository } from 'typeorm';

@Injectable()
export class DailyRepository {
  constructor(
    @InjectRepository(Daily)
    private dailyRepository: Repository<Daily>,
  ) {}
  public async save(daily: Daily): Promise<Daily> {
    return await this.dailyRepository.save(daily);
  }
  public async findAll(): Promise<Daily[]> {
    return await this.dailyRepository.find();
  }

  public async findOne(id: number): Promise<Daily | null> {
    return await this.dailyRepository.findOneBy({ id });
  }

  public async update(daily: Daily) {
     await this.dailyRepository.save(daily);
  }

  async remove(id: number): Promise<void> {
    await this.dailyRepository.delete(id);
  }
  public opa(nome: string) {
    return `Opa ${nome}, tudo certo por ai???`;
  }
}
