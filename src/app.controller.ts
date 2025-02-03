import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { AverageResponse } from './average-response';

@ApiTags('default')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({
    type: AverageResponse,
  })
  @ApiOperation({ summary: 'get road traffic counting hourly averages', operationId: 'data' })
  @Get('data')
  async getAverageResponse(): Promise<AverageResponse> {
    await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 500)));
    return this.appService.getAverageResponse();
  }
}
