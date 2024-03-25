import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Provider from 'src/contex/database/entities/provider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProviderRepository {
  constructor(
    @InjectRepository(Provider)
    private dailyRepository: Repository<Provider>,
  ) {}

  findAll(): Promise<Provider[]> {
    return this.dailyRepository.find();
  }

  findOne(id: number): Promise<Provider | null> {
    return this.dailyRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.dailyRepository.delete(id);
  }
}
