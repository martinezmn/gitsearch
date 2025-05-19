import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GitProfile } from '../entities/git-profile.entity';

@Injectable()
export class GitProfileRepository {
  constructor(
    @InjectRepository(GitProfile)
    private readonly gitProfileRepository: Repository<GitProfile>,
  ) {}

  async findLastProfiles(): Promise<GitProfile[]> {
    return this.gitProfileRepository.find({
      order: { lastFetchAt: 'DESC' },
      take: 5,
    });
  }

  async createOrUpdate(profile: GitProfile): Promise<GitProfile> {
    let existingProfile = await this.gitProfileRepository.findOneBy({
      gitId: profile.gitId,
    });

    existingProfile = { ...existingProfile, ...profile };

    return this.gitProfileRepository.save(existingProfile);
  }
}
