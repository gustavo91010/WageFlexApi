import { Injectable } from '@nestjs/common';
import Daily from 'src/contex/database/entities/daily';
import { DailyRepository } from 'src/contex/database/repository/daily.repository';
import OpenDailyDTO from '../models/open.daily.dto';
import UsersService from './users.service';
import ActivityService from './activity.service';
import CloseDailyDTO from '../models/close.daily.dto';
import { NotFoundException } from '../errors/not-found-exception';

@Injectable()
export default class DailyService {
  constructor(
    private readonly dailyRepository: DailyRepository,
    private readonly usersSerrvice: UsersService,
    private readonly activityService: ActivityService,
  ) {}

  public opa(nome: string) {
    return this.dailyRepository.opa(nome);
  }

  public async openDaily(dailyDto: OpenDailyDTO): Promise<Daily> {
    const { typeTask, provider_id, employer_id } = dailyDto;
    const employer = await this.usersSerrvice.findById(employer_id);
    const provider = await this.usersSerrvice.findById(provider_id);

    const activity = await this.activityService.findByType(typeTask);

    const daily = new Daily();
    daily.provider = provider;
    daily.employer = employer;

    daily.task[0] = activity;
    // daily.unitPrice = value;
    daily.startTime = new Date();
    const saveDaily = await this.dailyRepository.save(daily);

    return saveDaily;
  }

  public async closeDaily(closeDailyDTO: CloseDailyDTO): Promise<{
    success: boolean;
    message?: string;
    newDaily?: Daily;
}> {
    const { daily_id, unitPrice, serviceCost } = closeDailyDTO;
    const daily = await this.findById(daily_id);
    daily.unitPrice = unitPrice;

    if (serviceCost) {
      daily.serviceCost = serviceCost;
    }
    daily.endTime = new Date();

    const closeDaily = await this.update(daily.id, daily);
    return closeDaily;
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
      //await this.dailyRepository.update(newDaily);

      return { success: true, newDaily: newDaily };
    } catch (error) {
      return {
        success: false,
        message: 'Ocorreu um erro ao tentar atualizar a diária.',
      };
    }
  }
}
