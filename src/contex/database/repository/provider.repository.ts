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

  public async findAll(): Promise<Provider[]> {
    return await this.dailyRepository.find();
  }

  public async findOne(id: number): Promise<Provider | null> {
    return await this.dailyRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.dailyRepository.delete(id);
  }
}
