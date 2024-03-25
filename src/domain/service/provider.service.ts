import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../errors/not-found-exception';
import { ProviderRepository } from 'src/contex/database/repository/provider.repository';
import Provider from 'src/contex/database/entities/provider.entity';

@Injectable()
export default class ProviderService {
  constructor(private readonly providerRepository: ProviderRepository) {}

  public async findById(id: number): Promise<Provider> | null {
    const provider = await this.providerRepository.findOne(id);
    if (!provider) {
      throw new NotFoundException('Employer não encontrado');
    }
    return provider;
  }
}
