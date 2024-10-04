import fs from 'fs';
import path from 'path';
import { globalCachePath } from './paths';
import { installSinglePackage } from './download';
import { DependencyInstallation } from '../types';

export async function installPackageWithCache(dep: DependencyInstallation) {
  const cacheDir = path.join(globalCachePath, dep.name, dep.version);

  // Check if the package is already cached; skip the download if it is
  if (fs.existsSync(cacheDir)) {
    console.log(`Using cached version of ${dep.name}@${dep.version}`);
    return;
  }

  // If not, call the original installSinglePackage function to handle download and installation
  await installSinglePackage(dep);

  // Save the package to the cache after installation
  fs.mkdirSync(cacheDir, { recursive: true });
  fs.writeFileSync(
    path.join(cacheDir, 'package.json'),
    JSON.stringify(dep, null, 2)
  );
}
