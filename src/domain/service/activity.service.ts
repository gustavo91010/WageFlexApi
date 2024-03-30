import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../errors/not-found-exception';
import Activity from 'src/contex/database/entities/activity';
import { ActivityRepository } from 'src/contex/database/repository/activity.repository';

@Injectable()
export default class ActivityService {
  constructor(private readonly activityRepository: ActivityRepository) {}

  public async register(type: string): Promise<Activity> {
    const existActivity = await this.findByType(type.toLowerCase());

    if (existActivity) {
      // tem um bizu para se fazer aqui, com as ?? só nao sei como se aplica
      return existActivity;
    }
    return await this.create(type.toLowerCase());
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
      throw new NotFoundException('Atividade não encontrada');
    }
    return activity;
  }

  public async findByProvider(){
    
  }
}
