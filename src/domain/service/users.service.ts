import { BadRequestException, Injectable } from '@nestjs/common';
import { NotFoundException } from '../errors/not-found-exception';
import ActivityService from './activity.service';
import { randomUUID } from 'crypto';
import { MsgException } from '../errors/msg.exception';
import { UsersRepository } from 'src/contex/database/repository/users.repository';
import { Users } from 'src/contex/database/entities/users';
import { ERoles } from 'src/utils/ERoles';
import { UsersDto } from '../models/users.dto';
import Activity from 'src/contex/database/entities/activity';

@Injectable()
export default class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly taskService: ActivityService,
  ) {}

  public async create(usersDto: UsersDto): Promise<Users> {
    const { name, identification, isProvider, activities } = usersDto;
    const users = new Users();
    users.name = name;
    users.active = false;
    users.role = isProvider ? ERoles.provider : ERoles.employer;
    users.identification = this.addIndentification(users.role, identification);

    users.activities = [];
    if (await this.findByIdentification(identification)) {
      throw new MsgException('usuário já registrado');
    }

    if (!Array.isArray(activities) || activities.length === 0) {
      throw new BadRequestException();
    }

    users.create_at = new Date();
    users.accessToken = randomUUID();

    users.activities = await this.activityFactor(activities);

    return await this.usersRepository.save(users);
  }

  public async findById(id: number): Promise<Users> | null {
    const users = await this.usersRepository.findById(id);
    if (!users) {
      throw new NotFoundException('Users não encontrado');
    }
    return users;
  }
  public async findByIdentification(
    identification: string,
  ): Promise<Users> | null {
    const users =
      await this.usersRepository.findByIdentification(identification);

    return users;
  }

  public async findProviderByType(type: string): Promise<Users[]> {
    return await this.usersRepository.findProviderByType(type);
  }

  public async update(id: number, usersDto: Users): Promise<Users> {
    let users = await this.findById(id);

    Object.assign(users, usersDto),
      (users = await this.usersRepository.update(users));

    return users;
  }

  private async activityFactor(activities: string[]): Promise<Activity[]> {
    const listActivities: Activity[] = [];

    for (const singleTask of activities) {
      let newActivity;
      const existingTask = await this.taskService.findByType(singleTask);

      if (existingTask) {
        newActivity = existingTask;
      } else {
        newActivity = await this.taskService.register(singleTask);
      }
      listActivities.push(newActivity);
    }
    return listActivities;
  }

  private addIndentification(role: string, identification: string): string {
    if (ERoles.provider == role) {
      // Verificação se caracteristica do CNPJ
      const cnpjPaterns = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
      if (!cnpjPaterns.test(identification)) {
        throw new MsgException('CNPJ invalido.');
      }
    }
    if (ERoles.employer == role) {
      // Verificação se caracteristica do e-mail
      const emailPattern = /^\S+@\S+\.[a-zA-Z]{3}$/;
      if (!emailPattern.test(identification)) {
        throw new MsgException('E-mail invalido.');
      }
    }
    return identification;
  }
}
