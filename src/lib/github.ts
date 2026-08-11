import type { GitHubRepoResponse, GitHubUserResponse, ProjectConfig, RepoData } from '../types';

const GITHUB_API = 'https://api.github.com';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchRepo(config: ProjectConfig, attempt = 1): Promise<RepoData | null> {
  try {
    const res = await fetch(`${GITHUB_API}/repos/${config.repo}`, {
      headers: { Accept: 'application/vnd.github+json' },
    });

    if (res.status === 403 && attempt < 5) {
      await sleep(600 * attempt);
      return fetchRepo(config, attempt + 1);
    }

    if (!res.ok) {
      console.warn(`[github] Failed to fetch ${config.repo}: ${res.status}`);
      return null;
    }

    const data = (await res.json()) as GitHubRepoResponse;

    return {
      name: data.name,
      displayName: config.displayName ?? data.name,
      description: config.description ?? data.description ?? 'No description provided.',
      url: data.html_url,
      language: data.language,
      stars: data.stargazers_count,
      forks: data.forks_count,
      updatedAt: data.updated_at,
      topics: data.topics ?? [],
    };
  } catch (err) {
    console.warn(`[github] Error fetching ${config.repo}:`, err);
    return null;
  }
}

export async function fetchAllRepos(configs: ProjectConfig[]): Promise<RepoData[]> {
  const results: (RepoData | null)[] = [];
  for (const config of configs) {
    results.push(await fetchRepo(config));
    await sleep(250);
  }
  return results.filter((r): r is RepoData => r !== null);
}

export async function fetchUser(username: string): Promise<GitHubUserResponse | null> {
  try {
    const res = await fetch(`${GITHUB_API}/users/${username}`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!res.ok) return null;
    return (await res.json()) as GitHubUserResponse;
  } catch {
    return null;
  }
}

export function timeAgo(isoDate: string): string {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000));
  const units: [number, string][] = [
    [31536000, 'y'],
    [2592000, 'mo'],
    [86400, 'd'],
    [3600, 'h'],
    [60, 'min'],
  ];
  for (const [secs, label] of units) {
    const value = Math.floor(seconds / secs);
    if (value >= 1) return `${value}${label} ago`;
  }
  return 'just now';
}
