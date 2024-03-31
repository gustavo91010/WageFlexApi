import { Injectable } from '@nestjs/common';
import Daily from 'src/contex/database/entities/daily';
import { DailyRepository } from 'src/contex/database/repository/daily.repository';
import OpenDailyDTO from '../models/open.daily.dto';
import UsersService from './users.service';
import ActivityService from './activity.service';
import CloseDailyDTO from '../models/close.daily.dto';
import { NotFoundException } from '../errors/not-found-exception';
import { AttDailyDto } from '../models/att.daily.dto';
import { ERoles } from 'src/utils/ERoles';
import { MsgException } from '../errors/msg.exception';

@Injectable()
export default class DailyService {
  constructor(
    private readonly dailyRepository: DailyRepository,
    private readonly usersSerrvice: UsersService,
    private readonly activityService: ActivityService,
  ) {}

  public async openDaily(dailyDto: OpenDailyDTO): Promise<Daily> {
    const { typeTask, provider_id, employer_id } = dailyDto;
    const employer = await this.usersSerrvice.findById(employer_id);
    if (employer.role !== ERoles.employer) {
      throw new MsgException('Somente employers podem adrir diarias');
    }
    const provider = await this.usersSerrvice.findById(provider_id);

    const daily = new Daily();
    daily.provider = provider;
    daily.employer = employer;

    await this.activityService.activityFactor(typeTask);

    daily.startTime = new Date();
    const saveDaily = await this.dailyRepository.save(daily);

    if (saveDaily) {
      delete saveDaily.employer;
      delete saveDaily.provider;
    }

    return saveDaily;
  }

  public async findById(id: number): Promise<Daily> {
    const daily = await this.dailyRepository.findOne(id);
    if (!daily) {
      throw new NotFoundException('Diária não encontrada');
    }
    return daily;
  }

  public async attDaily(
    id: number,
    updateDailyDto: AttDailyDto,
  ): Promise<{ success: boolean; message?: string; newDaily?: Daily }> {
    const daily = await this.dailyRepository.findOne(id);

    if (!daily) {
      return { success: false, message: 'Diária não encontrada' };
    }
    if (!!daily.endTime) {
      throw new MsgException('Essa diaria já foi fechada');
    }
    daily.update_at = new Date();
    Object.assign(daily, updateDailyDto);

    await this.dailyRepository.update(daily);

    return { success: true, newDaily: daily };
  }
  public async closeDaily(
    id: number,
    closeDailyDTO: CloseDailyDTO,
  ): Promise<{
    success: boolean;
    message?: string;
    newDaily?: Daily;
  }> {
    const { unitPrice, serviceCost } = closeDailyDTO;
    const daily = await this.findById(id);
    daily.unitPrice = unitPrice;

    if (!!serviceCost) {
      daily.serviceCost = serviceCost;
    }
    if (!!unitPrice) {
      daily.unitPrice = unitPrice;
    }
    daily.update_at = new Date();
    daily.endTime = new Date();

    const closeDaily = await this.attDaily(daily.id, daily);

    return closeDaily;
  }
}
