import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Daily from 'src/contex/database/entities/daily.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DailyRepository {
  constructor(
    @InjectRepository(Daily)
    private dailyRepository: Repository<Daily>,
  ) {}

  public async findAll(): Promise<Daily[]> {
    return await this.dailyRepository.find();
  }

  public async findOne(id: number): Promise<Daily | null> {
    return await this.dailyRepository.findOneBy({ id });
  }

  public async update(
    id: number,
    newDaily: Daily,
  ): Promise<{ success: boolean; message?: string; newDaily?: Daily }> {
    try {
      const daily = await this.findOne(id);

      if (!daily) {
        return { success: false, message: 'Diária não encontrada' };
      }

      newDaily = Object.assign(daily, newDaily);
      return { success: true, newDaily: newDaily };
    } catch (error) {
      return {
        success: false,
        message: 'Ocorreu um erro ao tentar atualizar a diária.',
      };
    }
  }

  async remove(id: number): Promise<void> {
    await this.dailyRepository.delete(id);
  }
  public opa(nome: string) {
    return `Opa ${nome}, tudo certo por ai???`;
  }
}
