import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import Provider from 'src/contex/database/entities/provider.entity';
import ProviderDTO from 'src/domain/models/provider.dto';
import ProviderService from 'src/domain/service/provider.service';

@Controller('/provider')
export default class ProviderController {
  constructor(private readonly providerService: ProviderService) {}
  private readonly logger = new Logger(ProviderController.name);

  @Post()
  public async create(
    @Body() providerDto: ProviderDTO,
  ): Promise<{ provider: Provider }> {
    const response = await this.providerService.create(providerDto);
    this.logger.log('Create provider: ' + response.id);


    return {
      provider: response,
    };
  }

  @Get('/:id')
  public async findById(@Param('id') id: number): Promise<Provider> {
    return await this.providerService.findById(id);
  }
}
