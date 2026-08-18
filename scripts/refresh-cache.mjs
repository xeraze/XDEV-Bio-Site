import { fetchAllRepos } from '../src/lib/github.ts';
import { projects } from '../src/lib/projects.config.ts';
import * as fs from 'node:fs';
import * as path from 'node:path';

const results = await fetchAllRepos(projects);

const cache = {};
projects.forEach((config, i) => {
  const repo = results[i];
  if (repo) cache[config.repo] = repo;
});

const CACHE_PATH = path.join(process.cwd(), '.github-cache.json');
fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
console.log(`Refreshed ${results.length} repos -> ${CACHE_PATH}`);
