import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../errors/not-found-exception';
import { ProviderRepository } from 'src/contex/database/repository/provider.repository';
import Provider from 'src/contex/database/entities/provider.entity';
import ProviderDTO from '../models/provider.dto';
import TaskrService from './task.service';
import { MsgException } from '../errors/msg.exception';
import { randomUUID } from 'crypto';

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
    provider.task = [];

    if (await this.findByCnpj(cnpj)) {
      throw new MsgException('Provider já registrado');
    }

    if (!Array.isArray(task) || task.length === 0) {
      throw new MsgException('A lista de task não pode estar vazia');
    }

    provider.create_at = new Date();
    provider.accessToken = randomUUID();

    for (const singleTask of task) {
      let newTask;
      const existingTask = await this.taskService.findByType(singleTask);

      if (existingTask) {
        newTask = existingTask;
      } else {
        newTask = await this.taskService.register(singleTask);
      }
      provider.task.push(newTask);
    }    console.log('provider',provider)
    const newprovider = await this.providerRepository.save(provider);
    console.log('newprovider',newprovider)
    return newprovider;
  }

  public async findByCnpj(cnpj: string): Promise<Provider> {
    return await this.providerRepository.findCnpj(cnpj);
  }
}
