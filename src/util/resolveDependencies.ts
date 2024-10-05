import { InstallationPlan } from '../types';
import { getPackageInfo } from './registry';
import { DependencyInfo } from '../types/interfaces';

/**
 * Recursively resolves the dependencies for a given package.
 *
 * @param packageName - The name of the package to resolve.
 * @param versionRange - The version range of the package (e.g., ^1.0.0).
 * @param installationPlan - The list where resolved dependencies will be added.
 * @returns A promise resolving to void.
 */

export async function resolveDependencies(
  packageName: string,
  versionRange: string,
  installationPlan: InstallationPlan
): Promise<void> {
  // Fetch package data from the registry based on the package name and version range.
  const packageData: DependencyInfo = await getPackageInfo({
    name: packageName,
    version: versionRange,
  });

  // Add the resolved package and version to the installation plan.
  installationPlan.push({
    name: packageName,
    version: packageData.version,
  });

  // Recursively resolve dependencies for the current package.
  if (packageData.dependencies) {
    for (const [depName, depVersionRange] of Object.entries(
      packageData.dependencies! as Record<string, string>
    )) {
      await resolveDependencies(depName, depVersionRange, installationPlan);
    }
  }
}
