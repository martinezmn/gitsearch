export interface GitProfileInterface {
  id: number;
  gitId: number;
  name: string;
  login: string;
  bio: string;
  avatarUrl: string;
  followers: number;
  lastFetchAt: Date;
  createdAt: Date;
}
