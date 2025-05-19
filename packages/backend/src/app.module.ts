import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { GithubModule } from './modules/github/github.module';

@Module({
  imports: [DatabaseModule, GithubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
