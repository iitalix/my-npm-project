import { InstallationPlan } from '../../types';
import { resolveDependencies } from '../../util/resolveDependencies';
import { saveLockFile, readLockFile } from '../../util/lockfile';

/**
 *
 * @param topLevelDependencies The list of dependencies as determined by package.json's `dependencies` object
 * @returns The installation plan
 */
export async function constructInstallationPlan(
  topLevelDependencies: Record<string, string>
): Promise<InstallationPlan> {
  // Check if a lock file already exists for reproducible installs
  const cachedPlan = readLockFile();

  if (cachedPlan) {
    console.log('Using installation plan from lock file.');
    return cachedPlan;
  }

  // If no lock file exists, create new installation plan and proceed to resolve dependencies
  const installationPlan: InstallationPlan = [];

  for (const [packageName, versionRange] of Object.entries(
    topLevelDependencies
  )) {
    await resolveDependencies(packageName, versionRange, installationPlan);
  }

  // Save the installation plan to a lock file for future reproducible installs
  saveLockFile(installationPlan);

  return installationPlan;
}
