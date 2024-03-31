import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../errors/not-found-exception';
import Activity from 'src/contex/database/entities/activity';
import { ActivityRepository } from 'src/contex/database/repository/activity.repository';
import { MsgException } from '../errors/msg.exception';

@Injectable()
export default class ActivityService {
  constructor(private readonly activityRepository: ActivityRepository) {}

  public async register(type: string): Promise<Activity> {
    const existActivity = await this.findByType(type.toLowerCase());

    return existActivity ?? (await this.create(type.toLowerCase()));
  }

  private async create(type: string): Promise<Activity> {
    const activity = new Activity(type);
    return await this.activityRepository.save(activity);
  }
  public async findById(id: number): Promise<Activity> | null {
    const activity = await this.activityRepository.findOne(id);
    if (!activity) {
      throw new NotFoundException('Atividade não encontrada');
    }
    return activity;
  }
  public async findByType(type: string): Promise<Activity> | null {
    const activity = await this.activityRepository.findType(type);
    if (!activity) {
      // throw new NotFoundException('Atividade não encontrada');
    }
    return activity;
  }
  public async findALl(): Promise<Activity[]> | null {
    const activity = await this.activityRepository.findAll();

    return activity;
  }
  public async findByProvider() {}

  public async activesMustNotBeEmpty(activities: string[]) {
    if (!Array.isArray(activities) || activities.length === 0) {
      throw new MsgException('O campo de servciço não pode estar vazio');
    }
  }
  public async activityFactor(activities: string[]): Promise<Activity[]> {
    if (!Array.isArray(activities) || activities.length === 0) {
      throw new MsgException('O campo de servciço não pode estar vazio');
    }
    const listActivities: Activity[] = [];

    for (const singleTask of activities) {
      const existingTask = await this.findByType(singleTask);

      const activity = existingTask
        ? existingTask
        : await this.register(singleTask);

      listActivities.push(activity);
    }
    return listActivities;
  }
}
