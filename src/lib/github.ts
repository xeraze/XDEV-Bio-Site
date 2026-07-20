import type { GitHubRepoResponse, GitHubUserResponse, ProjectConfig, RepoData } from '../types';

const GITHUB_API = 'https://api.github.com';

/**
 * Fetches repo metadata at BUILD TIME (this runs on the server during
 * `astro build`, not in the browser). This means the data is baked into
 * the static HTML — no client-side loading spinners, no rate-limit
 * surprises for visitors, and it stays fresh every time you rebuild/redeploy.
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchRepo(config: ProjectConfig, attempt = 1): Promise<RepoData | null> {
  try {
    const res = await fetch(`${GITHUB_API}/repos/${config.repo}`, {
      headers: { Accept: 'application/vnd.github+json' },
    });

    // GitHub's unauthenticated rate limit occasionally 403s a burst of
    // parallel requests even when well under the hourly cap. A short
    // backoff and retry clears this up without needing a token.
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
  // Sequential with a small stagger instead of Promise.all — avoids
  // firing a burst of simultaneous unauthenticated requests at once.
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

/** Relative "updated 3 days ago" style formatting, no dependency needed. */
export function timeAgo(isoDate: string): string {
  const seconds = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
  const units: [number, string][] = [
    [31536000, 'y'],
    [2592000, 'mo'],
    [86400, 'd'],
    [3600, 'h'],
    [60, 'm'],
  ];
  for (const [secs, label] of units) {
    const value = Math.floor(seconds / secs);
    if (value >= 1) return `${value}${label} ago`;
  }
  return 'just now';
}
