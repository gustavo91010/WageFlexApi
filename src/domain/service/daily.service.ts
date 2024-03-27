import { Injectable } from '@nestjs/common';
import Daily from 'src/contex/database/entities/daily.entity';
import { DailyRepository } from 'src/contex/database/repository/daily.repository';
import OpenDailyDTO from '../models/open.daily.dto';
import ProviderService from './provider.service';
import EmployerService from './employer.service';
import TaskrService from './task.service';
import CloseDailyDTO from '../models/close.daily.dto';
import { NotFoundException } from '../errors/not-found-exception';

@Injectable()
export default class DailyService {
  constructor(
    private readonly dailyRepository: DailyRepository,
    private readonly providerService: ProviderService,
    private readonly employerervice: EmployerService,
    private readonly taskrService: TaskrService,
  ) {}

  public opa(nome: string) {
    return this.dailyRepository.opa(nome);
  }

  public async openDaily(dailyDto: OpenDailyDTO): Promise<Daily> | null {
    const { typeTask, provider_id, employer_id } = dailyDto;
    const employer = await this.employerervice.findById(employer_id);
    const provider = await this.providerService.findById(provider_id);
    const task = await this.taskrService.findByType(typeTask);

    const daily = new Daily();
    daily.employer = employer;
    daily.provider = provider;
    daily.task[0] = task;
    // daily.unitPrice = value;
    daily.startTime = new Date();

    return daily;
  }

  public async closeDaily(closeDailyDTO: CloseDailyDTO) {
    const { daily_id, unitPrice, serviceCost } = closeDailyDTO;
    const daily = await this.findById(daily_id);
    daily.unitPrice = unitPrice;

    if (serviceCost) {
      daily.serviceCost = serviceCost;
    }
    daily.endTime = new Date();

    return await this.update(daily.id, daily);
  }

  public async findById(id: number): Promise<Daily> {
    const daily = await this.dailyRepository.findOne(id);
    if (!daily) {
      throw new NotFoundException('Diária não encontrada');
    }
    return daily;
  }

  public async update(
    id: number,
    newDaily: Daily,
  ): Promise<{ success: boolean; message?: string; newDaily?: Daily }> {
    try {
      const daily = await this.dailyRepository.findOne(id);

      if (!daily) {
        return { success: false, message: 'Diária não encontrada' };
      }

      newDaily = Object.assign(daily, newDaily);
      await this.dailyRepository.update(newDaily);

      return { success: true, newDaily: newDaily };
    } catch (error) {
      return {
        success: false,
        message: 'Ocorreu um erro ao tentar atualizar a diária.',
      };
    }
  }
}
