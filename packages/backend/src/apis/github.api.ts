import { Injectable } from '@nestjs/common';

@Injectable()
export class GithubAPI {
  private readonly githubApiUrl = 'https://api.github.com';

  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.githubApiUrl}/${path}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error fetching GitHub API: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }
}
