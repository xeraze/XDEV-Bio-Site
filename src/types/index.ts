/** A single project pinned on the site, backed by a live GitHub repo. */
export interface ProjectConfig {
  /** owner/repo, e.g. "xeraze/KBank" */
  repo: string;
  /** Optional override if you want a nicer display name than the repo name */
  displayName?: string;
  /** Optional override description (falls back to the repo's GitHub description) */
  description?: string;
}

/** Normalized repo data after fetching from the GitHub API. */
export interface RepoData {
  name: string;
  displayName: string;
  description: string;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  topics: string[];
}

/** Raw shape of the fields we use from GitHub's REST API repo response. */
export interface GitHubRepoResponse {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
}

/** Raw shape of the fields we use from GitHub's REST API user response. */
export interface GitHubUserResponse {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  html_url: string;
  public_repos: number;
  followers: number;
}

/** Discord activity as returned by Lanyard. */
export interface LanyardActivity {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  application_id?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
}

export interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    global_name?: string;
    avatar: string | null;
  };
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: LanyardActivity[];
  listening_to_spotify: boolean;
  spotify?: {
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
    timestamps: { start: number; end: number };
  };
}

export interface LanyardResponse {
  success: boolean;
  data: LanyardData;
}
