import { Injectable } from '@nestjs/common';
import { GitProfileInterface } from '../../interfaces/git-profile.interface';
import { GitProfile } from '../../database/entities/git-profile.entity';
import { GithubAPI } from '../../apis/github.api';

@Injectable()
export class GithubService {
  constructor(private readonly githubAPI: GithubAPI) {}

  async getGitProfile(username: string): Promise<GitProfile> {
    const gitProfile = await this.githubAPI.get<GitProfileInterface>(
      `users/${username}`,
    );

    const profile: GitProfile = {
      gitId: gitProfile.id,
      name: gitProfile.name,
      login: gitProfile.login,
      bio: gitProfile.bio,
      avatarUrl: gitProfile.avatar_url,
      followers: gitProfile.followers,
      lastFetchAt: new Date(),
    };

    return profile;
  }
}
