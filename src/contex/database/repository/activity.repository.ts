import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Activity from '../entities/activity';

@Injectable()
export class ActivityRepository {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  public async save(activity: Activity): Promise<Activity> {
    return await this.activityRepository.save(activity);
  }
  public async findAll(): Promise<Activity[]> {
    return await this.activityRepository.find();
  }

  public async findOne(id: number): Promise<Activity | null> {
    return await this.activityRepository.findOneBy({ id });
  }
  public async findType(type: string): Promise<Activity> {
    return await this.activityRepository.findOneBy({ type });
  }



  async remove(id: number): Promise<void> {
    await this.activityRepository.delete(id);
  }
}
