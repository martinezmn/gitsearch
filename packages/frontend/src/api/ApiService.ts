import type { GitProfileInterface } from "../interfaces/git-profile.interface";

export class ApiService {
  private static readonly BASE_URL = "http://localhost:3000";

  static async getGithubProfiles(): Promise<GitProfileInterface[]> {
    const response = await fetch(`${ApiService.BASE_URL}/github`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }

  static async searchGithubProfile(
    username: string
  ): Promise<GitProfileInterface> {
    const response = await fetch(`${ApiService.BASE_URL}/github/${username}`);
    if (!response.ok) {
      throw await response.json();
    }
    return response.json();
  }
}
