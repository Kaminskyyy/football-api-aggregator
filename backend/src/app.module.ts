import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { FootballModule } from './football/football.module';
import databaseConfig from './config/database.config';
import footballApiHeadersConfig from './config/football-api-headers.config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from './filters/all-exception.filter';
import { RequestsStatisticsModule } from './request-statistics/requests-statistics.module';
import { RequestDurationInterceptor } from './interceptors/request-duration.interceptor';
import { RequestsCounterInterceptor } from './interceptors/request-counter.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [databaseConfig, footballApiHeadersConfig],
    }),
    DatabaseModule,
    FootballModule,
    RequestsStatisticsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestDurationInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestsCounterInterceptor,
    },
  ],
})
export class AppModule {}
