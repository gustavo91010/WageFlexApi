import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../errors/not-found-exception';
import Activity from 'src/contex/database/entities/activity';
import { ActivityRepository } from 'src/contex/database/repository/activity.repository';

@Injectable()
export default class ActivityService {
  constructor(private readonly activityRepository: ActivityRepository) {}

  public async register(type: string): Promise<Activity> {
    let nastType = await this.findByType(type.toLowerCase());

    if (!nastType) {
     nastType = await this.create(type);
    }
    return nastType;
  }

  private async create(type: string): Promise<Activity> {
    const activity = new Activity(type);
    return await this.activityRepository.save(activity);
  }
  public async findById(id: number): Promise<Activity> | null {
    const activity = await this.activityRepository.findOne(id);
    if (!activity) {
      throw new NotFoundException('Employer não encontrado');
    }
    return activity;
  }
  public async findByType(type: string): Promise<Activity> | null {
    const activity = await this.activityRepository.findType(type);
    return activity;
  }
}
