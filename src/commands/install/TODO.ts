import { InstallationPlan } from '../../types';
import { resolveDependencies } from '../../util/resolveDependencies';

/**
 *
 * @param topLevelDependencies The list of dependencies as determined by package.json's `dependencies` object
 * @returns The installation plan
 */
export async function constructInstallationPlan(
  topLevelDependencies: Record<string, string>
): Promise<InstallationPlan> {
  // TODO -> Determine the full list of dependencies to download
  const installationPlan: InstallationPlan = [];

  for (const [packageName, versionRange] of Object.entries(
    topLevelDependencies
  )) {
    await resolveDependencies(packageName, versionRange, installationPlan);
  }

  return installationPlan;
}
