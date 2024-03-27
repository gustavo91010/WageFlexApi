import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../errors/not-found-exception';
import { ProviderRepository } from 'src/contex/database/repository/provider.repository';
import Provider from 'src/contex/database/entities/provider.entity';
import ProviderDTO from '../models/provider.dto';
import TaskrService from './task.service';

@Injectable()
export default class ProviderService {
  constructor(
    private readonly providerRepository: ProviderRepository,
    private readonly taskService: TaskrService,
  ) {}

  public async findById(id: number): Promise<Provider> | null {
    const provider = await this.providerRepository.findOne(id);
    if (!provider) {
      throw new NotFoundException('Employer não encontrado');
    }
    return provider;
  }
  public async create(employerDto: ProviderDTO): Promise<Provider> {
    const { legalName, cnpj, task } = employerDto;
    const provider = new Provider();
    provider.legalName = legalName;
    provider.cnpj = cnpj;

    // Cria um array de Promises para todas as chamadas assíncronas
    const taskPromises = task.map(async (singleTask) => {
      return await this.taskService.create(singleTask);
    });

    // Espera todas as Promises serem resolvidas usando Promise.all()
    const tasks = await Promise.all(taskPromises);

    // Adiciona as tarefas resolvidas ao objeto employer
    provider.task.push(...tasks);
    return provider;
  }
}
