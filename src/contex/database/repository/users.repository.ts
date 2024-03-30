import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/users';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  public async save(users: Users): Promise<Users> {
    if (!(users instanceof Users)) {
      throw new Error('O objeto recebido não é do tipo Users.');
    }
    const um: Users = users;

    return await this.usersRepository.save(um);
  }
  public async findAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  public async findById(id: number): Promise<Users | null> {
    return await this.usersRepository.findOneBy({ id });
  }
  public async findByIdentification(
    identification: string,
  ): Promise<Users | null> {
    return await this.usersRepository.findOneBy({ identification });
  }

  async update(users: Users): Promise<Users> {
    return await this.usersRepository.save(users);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
