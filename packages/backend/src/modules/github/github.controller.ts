import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from './github.service';
import { GitProfile } from '../../database/entities/git-profile.entity';
import { GitProfileRepository } from '../../database/repositories/git-profile.repository';

@Controller('github')
export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private readonly gitProfileRepository: GitProfileRepository,
  ) {}

  @Get()
  async getLastProfiles(): Promise<GitProfile[]> {
    const gitProfiles = await this.gitProfileRepository.findLastProfiles();
    return gitProfiles;
  }

  @Get(':username')
  async getGitProfile(
    @Param('username') username: string,
  ): Promise<GitProfile> {
    const gitApiProfile = await this.githubService.getGitProfile(username);
    const gitProfile =
      await this.gitProfileRepository.createOrUpdate(gitApiProfile);
    return gitProfile;
  }
}
