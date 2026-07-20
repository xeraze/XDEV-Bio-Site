import type { ProjectConfig } from '../types';

/**
 * Add or remove repos here — that's it. No need to touch images, icons,
 * or descriptions by hand anymore; those are pulled live from GitHub
 * at build time. Optional overrides are available if a repo's real
 * name/description isn't what you want shown.
 */
export const projects: ProjectConfig[] = [
  { repo: 'xeraze/KBank' },
  { repo: 'xeraze/tsn-ua', displayName: 'TSN-UA' },
  { repo: 'xeraze/Pricelist' },
];

export const GITHUB_USERNAME = 'xeraze';
export const DISCORD_USER_ID = '1404735389603860503';
