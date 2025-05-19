import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GitProfileRepository } from './repositories/git-profile.repository';
import { GitProfile } from './entities/git-profile.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
      host: process.env.DB_HOST || 'postgres',
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'gitsearch',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
    }),
    TypeOrmModule.forFeature([GitProfile]),
  ],
  providers: [GitProfileRepository],
  exports: [GitProfileRepository],
})
export class DatabaseModule {}
