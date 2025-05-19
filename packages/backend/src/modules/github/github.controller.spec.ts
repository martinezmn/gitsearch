import { Test, TestingModule } from '@nestjs/testing';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { GitProfile } from '../../database/entities/git-profile.entity';
import { GitProfileRepository } from '../../database/repositories/git-profile.repository';
import { GithubAPI } from '../../apis/github.api';
import { GitProfileInterface } from 'src/interfaces/git-profile.interface';

describe('GithubController', () => {
  let controller: GithubController;
  let service: GithubService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GithubController],
      providers: [
        GithubService,
        { provide: GithubAPI, useValue: { get: jest.fn() } },
        {
          provide: GitProfileRepository,
          useValue: { findLastProfiles: jest.fn(), createOrUpdate: jest.fn() },
        },
      ],
    }).compile();

    controller = app.get<GithubController>(GithubController);
    service = app.get<GithubService>(GithubService);
  });

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-01-01'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('getLastProfiles', () => {
    it('should successfully return an array of profiles', async () => {
      const mockResult: GitProfile = {
        gitId: 1,
        name: 'John Doe',
        login: 'johndoe',
        bio: 'Software Engineer',
        avatarUrl: 'https://example.com/avatar.jpg',
        followers: 100,
        lastFetchAt: new Date(),
      };

      const spyOnServiceFindProfiles = jest
        .spyOn(controller['gitProfileRepository'], 'findLastProfiles')
        .mockResolvedValue([mockResult]);

      const result = await controller.getLastProfiles();

      expect(spyOnServiceFindProfiles).toHaveBeenCalledTimes(1);
      expect(result[0]).toBe(mockResult);
    });
  });

  describe('getGitProfile', () => {
    it('should successfully return the username profile', async () => {
      const mockAPIReturn: Partial<GitProfileInterface> = {
        id: 1,
        name: 'John Doe',
        login: 'johndoe',
        bio: 'Software Engineer',
        avatar_url: 'https://example.com/avatar.jpg',
        followers: 100,
      };

      const mockResult: GitProfile = {
        gitId: 1,
        name: 'John Doe',
        login: 'johndoe',
        bio: 'Software Engineer',
        avatarUrl: 'https://example.com/avatar.jpg',
        followers: 100,
        lastFetchAt: new Date(),
      };

      const spyOnGithubAPIGet = jest
        .spyOn(service['githubAPI'], 'get')
        .mockResolvedValue(mockAPIReturn);

      const spyOnCreateOrUpdate = jest
        .spyOn(controller['gitProfileRepository'], 'createOrUpdate')
        .mockResolvedValue(mockResult);

      const result = await controller.getGitProfile('johndoe');

      expect(spyOnGithubAPIGet).toHaveBeenCalledTimes(1);
      expect(spyOnCreateOrUpdate).toHaveBeenCalledWith(mockResult);
      expect(result).toBe(mockResult);
    });
  });
});
