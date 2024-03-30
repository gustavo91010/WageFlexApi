import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { Users } from 'src/contex/database/entities/users';
import { UsersDto } from 'src/domain/models/users.dto';
import UsersService from 'src/domain/service/users.service';

@Controller('/users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new Logger(UsersController.name);

  @Post()
  public async create(
    @Body() usersDto: UsersDto,
  ): Promise<{ message: string; provider: Users }> {
    try {
      const response = await this.usersService.create(usersDto);
      this.logger.log(`Create ${response.role}: ${response.id}`);

      return {
        message: `Create ${response.role}: ${response.id}`,
        provider: response,
      };
    } catch (error) {
      return {
        message: error.message,
        provider: null,
      };
    }
  }

  @Get('/:id')
  public async findById(@Param('id') id: number): Promise<Users> {
    return await this.usersService.findById(id);
  }

  @Get('/identification/:identification')
  public async findByIdentification(
    @Param('identification') identification: string,
  ): Promise<Users> {
    return await this.usersService.findByIdentification(identification);
  }

  @Get('/provider-activity/:activity')
  public async findProviderByType(
    @Param('activity') activity: string,
  ): Promise<Users[]> {
    return await this.usersService.findProviderByActivity(activity);
  }
  @Get('/employer-activity/:activity')
  public async findEmployerByType(
    @Param('activity') activity: string,
  ): Promise<Users[]> {
    return await this.usersService.findEmployerByActivity(activity);
  }
}
