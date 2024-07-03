import { Module } from '@nestjs/common';
import { FootballController } from './football.controller';
import { FootballService } from './football.service';
import { HttpModule } from '@nestjs/axios';
import { FootballApiService } from './football-api.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FOOTBALL_API_HEADERS_CONFIG_NAME } from 'src/config/football-api-headers.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaguesStatistics } from 'src/database/entities/leagues-statistics.entity';
import { RequestsStatisticsModule } from 'src/request-statistics/requests-statistics.module';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        headers: configService.get(FOOTBALL_API_HEADERS_CONFIG_NAME),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([LeaguesStatistics]),
    RequestsStatisticsModule,
  ],
  controllers: [FootballController],
  providers: [FootballService, FootballApiService],
})
export class FootballModule {}
