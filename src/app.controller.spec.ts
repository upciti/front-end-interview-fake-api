import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return average response', async () => {
      expect(await appController.getAverageResponse()).toEqual(
        expect.objectContaining({
          overallHourlyAverage: expect.any(Number),
          hourlyAverages: {
            '0': expect.any(Number),
            '1': expect.any(Number),
            '2': expect.any(Number),
            '3': expect.any(Number),
            '4': expect.any(Number),
            '5': expect.any(Number),
            '6': expect.any(Number),
            '7': expect.any(Number),
            '8': expect.any(Number),
            '9': expect.any(Number),
            '10': expect.any(Number),
            '11': expect.any(Number),
            '12': expect.any(Number),
            '13': expect.any(Number),
            '14': expect.any(Number),
            '15': expect.any(Number),
            '16': expect.any(Number),
            '17': expect.any(Number),
            '18': expect.any(Number),
            '19': expect.any(Number),
            '20': expect.any(Number),
            '21': expect.any(Number),
            '22': expect.any(Number),
            '23': expect.any(Number),
          },
          hourlyAveragesByWeekday: {
            '1': expect.any(Number),
            '2': expect.any(Number),
            '3': expect.any(Number),
            '4': expect.any(Number),
            '5': expect.any(Number),
            '6': expect.any(Number),
            '7': expect.any(Number),
          },
          hourWithHighestAverage: {
            value: expect.any(Number),
            time: expect.any(String),
          },
          hourWithLowestAverage: {
            value: expect.any(Number),
            time: expect.any(String),
          },
        }),
      );
    });
  });
});
