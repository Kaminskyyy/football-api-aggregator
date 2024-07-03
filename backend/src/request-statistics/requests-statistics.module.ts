import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsStatistics } from 'src/database/entities/requests-statistics.entity';
import { RequestsStatisticsService } from './requests-statistics.service';
import { RequestsStatisticsController } from './requests-statistics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RequestsStatistics])],
  controllers: [RequestsStatisticsController],
  providers: [RequestsStatisticsService],
  exports: [RequestsStatisticsService],
})
export class RequestsStatisticsModule {}
