import fs from 'fs';
import path from 'path';
import { globalCachePath } from './paths';
import { installSinglePackage } from './download';
import { CacheEntry } from '../types/interfaces';
import { DependencyInstallation } from '../types';

/**
 * Installs a package, using a cache to minimize redundant downloads.
 *
 * @param dep - The dependency to install, including name, version, and optionally the parent directory.
 * @returns A promise resolving to void.
 */

export async function installPackageWithCache(
  dep: DependencyInstallation
): Promise<void> {
  // Create cach directory path from package name and version
  const cacheDir = path.join(globalCachePath, dep.name, dep.version);

  // Check if the package is already cached; skip the download if it is
  if (fs.existsSync(cacheDir)) {
    console.log(`Using cached version of ${dep.name}@${dep.version}`);
    return;
  }

  // If not, call the original installSinglePackage function to handle download and installation
  await installSinglePackage(dep);

  const cachEntry: CacheEntry = {
    name: dep.name,
    version: dep.version,
    path: cacheDir,
    packageJson: dep,
  };

  // Save the package to the cache after installation
  fs.mkdirSync(cacheDir, { recursive: true });
  fs.writeFileSync(
    path.join(cacheDir, 'package.json'),
    JSON.stringify(cachEntry, null, 2)
  );
}
