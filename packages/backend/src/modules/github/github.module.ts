import { Module } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { GithubAPI } from '../../apis/github.api';

@Module({
  imports: [],
  controllers: [GithubController],
  providers: [GithubService, GithubAPI],
})
export class GithubModule {}
