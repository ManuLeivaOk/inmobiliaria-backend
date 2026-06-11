import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isProduction = config.get<string>('nodeEnv') === 'production';

        return {
          type: 'postgres',
          host: config.get<string>('database.host'),
          port: config.get<number>('database.port'),
          username: config.get<string>('database.username'),
          password: config.get<string>('database.password'),
          database: config.get<string>('database.name'),
          autoLoadEntities: true,
          synchronize:
            !isProduction && config.get<boolean>('database.synchronize'),
          dropSchema: !isProduction && config.get<boolean>('database.dropSchema'),
          ssl: config.get<boolean>('database.ssl')
            ? { rejectUnauthorized: false }
            : false,
          logging: config.get<string>('nodeEnv') === 'development',
        };
      },
    }),
  ],
})
export class DatabaseModule {}
