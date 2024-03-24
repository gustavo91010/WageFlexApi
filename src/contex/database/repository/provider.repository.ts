import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProviderEntity from 'src/contex/database/entities/provider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProviderRepository {
  constructor(
    @InjectRepository(ProviderEntity)
    private dailyRepository: Repository<ProviderEntity>,
  ) {}

  findAll(): Promise<ProviderEntity[]> {
    return this.dailyRepository.find();
  }

  findOne(id: number): Promise<ProviderEntity | null> {
    return this.dailyRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.dailyRepository.delete(id);
  }
}
