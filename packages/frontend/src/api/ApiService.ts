export class ApiService {
  private static readonly BASE_URL = "http://localhost:3000";

  static async getGithubProfiles() {
    const response = await fetch(`${ApiService.BASE_URL}/github`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
}
