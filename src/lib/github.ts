import type { GitHubRepoResponse, GitHubUserResponse, ProjectConfig, RepoData } from '../types';
import * as fs from 'node:fs';
import * as path from 'node:path';

const GITHUB_API = 'https://api.github.com';

const CACHE_PATH = path.join(process.cwd(), '.github-cache.json');

const _headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
if (process.env.GITHUB_TOKEN) {
  _headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function readCache(): Record<string, RepoData> {
  try {
    if (!fs.existsSync(CACHE_PATH)) return {};
    return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8')) as Record<string, RepoData>;
  } catch {
    return {};
  }
}

function writeCache(cache: Record<string, RepoData>) {
  try {
    fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
  } catch {
  }
}

export async function fetchRepo(config: ProjectConfig, attempt = 1): Promise<RepoData | null> {
  try {
    const res = await fetch(`${GITHUB_API}/repos/${config.repo}`, { headers: _headers });

    if (res.status === 403 && attempt < 5) {
      await sleep(600 * attempt);
      return fetchRepo(config, attempt + 1);
    }

    if (!res.ok) {
      console.warn(`[github] Failed to fetch ${config.repo}: ${res.status}`);
      const cached = readCache()[config.repo];
      if (cached) return cached;
      return null;
    }

    const data = (await res.json()) as GitHubRepoResponse;

    const lastCommitAt = await fetchLastCommit(config.repo);

    const repoData: RepoData = {
      name: data.name,
      displayName: config.displayName ?? data.name,
      description: config.description ?? data.description ?? 'No description provided.',
      url: data.html_url,
      fullName: data.full_name,
      language: data.language,
      stars: data.stargazers_count,
      forks: data.forks_count,
      updatedAt: data.updated_at,
      lastCommitAt,
      topics: data.topics ?? [],
    };

    const cache = readCache();
    cache[config.repo] = repoData;
    writeCache(cache);

    return repoData;
  } catch (err) {
    console.warn(`[github] Error fetching ${config.repo}:`, err);
    const cached = readCache()[config.repo];
    if (cached) return cached;
    return null;
  }
}

async function fetchLastCommit(repo: string): Promise<string | null> {
  try {
    const res = await fetch(`${GITHUB_API}/repos/${repo}/commits?per_page=1`, { headers: _headers });

    if (res.status === 403) {
      const cached = readCache()[repo];
      return cached?.lastCommitAt ?? null;
    }

    if (!res.ok) return null;

    const commits = (await res.json()) as { commit?: { committer?: { date?: string } } }[];
    return commits[0]?.commit?.committer?.date ?? null;
  } catch {
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