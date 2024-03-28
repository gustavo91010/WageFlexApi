import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Provider from 'src/contex/database/entities/provider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProviderRepository {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}
  public async save(provider: Provider): Promise<Provider> {
    if (!(provider instanceof Provider)) {
      throw new Error('O objeto recebido não é do tipo Provider.');
  }
    console.log('no repository', provider);
    console.log('no repository', typeof provider);
    return await this.providerRepository.save(provider);
  }
  public async findAll(): Promise<Provider[]> {
    return await this.providerRepository.find();
  }

  public async findOne(id: number): Promise<Provider | null> {
    return await this.providerRepository.findOneBy({ id });
  }
  public async findCnpj(cnpj: string): Promise<Provider | null> {
    return await this.providerRepository.findOneBy({ cnpj });
  }

  async remove(id: number): Promise<void> {
    await this.providerRepository.delete(id);
  }
}
