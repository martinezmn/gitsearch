import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GithubAPI {
  private readonly githubApiUrl = 'https://api.github.com';

  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.githubApiUrl}/${path}`, {
      method: 'GET',
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new NotFoundException('GitHub profile not found.');
      }
      throw new Error(`Error fetching GitHub API: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }
}
