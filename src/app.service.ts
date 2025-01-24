import { Injectable } from '@nestjs/common';

import { AverageResponse } from './average-response';
import { generateFakeAverageResponse } from './fake-data';

@Injectable()
export class AppService {
  getAverageResponse(): AverageResponse {
    return generateFakeAverageResponse();
  }
}
