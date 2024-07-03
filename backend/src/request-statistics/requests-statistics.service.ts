import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestsStatistics } from 'src/database/entities/requests-statistics.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RequestsStatisticsService {
  constructor(
    @InjectRepository(RequestsStatistics)
    private readonly requestStatisticsRepo: Repository<RequestsStatistics>,
  ) {}

  async updateStatistics(
    method: string,
    url: string,
    isSuccessful: boolean,
  ): Promise<void> {
    const endpoint = `${method.toUpperCase()}_${url}`;

    let requestCount = await this.requestStatisticsRepo.findOne({
      where: {
        endpoint,
      },
    });

    if (!requestCount) {
      requestCount = this.requestStatisticsRepo.create({
        endpoint,
        countFailed: 0,
        countSuccessful: 0,
      });
    }

    if (isSuccessful) {
      requestCount.countSuccessful += 1;
    } else {
      requestCount.countFailed += 1;
    }

    await requestCount.save();
  }

  async findStatistics() {
    return this.requestStatisticsRepo.find({
      select: {
        endpoint: true,
        countSuccessful: true,
        countFailed: true,
      },
    });
  }
}
