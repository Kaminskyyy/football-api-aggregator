import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DatabaseConfig,
  DATABASE_CONFIG_NAME,
} from 'src/config/database.config';
import { LeaguesStatistics } from './entities/leagues-statistics.entity';
import { RequestsStatistics } from './entities/requests-statistics.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const options = configService.get<DatabaseConfig>(DATABASE_CONFIG_NAME);

        return {
          type: 'postgres',
          entities: [LeaguesStatistics, RequestsStatistics],
          ...options,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
