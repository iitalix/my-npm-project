import fs from 'fs';
import path from 'path';
import { InstallationPlan } from '../types';
import { outputDir } from './paths';

const lockFilePath = path.join(outputDir, 'installLock.json');

// Save the lock file with the resolved installation plan
export function saveLockFile(installationPlan: InstallationPlan): void {
  fs.writeFileSync(lockFilePath, JSON.stringify(installationPlan, null, 2));
}

// Read the lock file if it exists
export function readLockFile(): InstallationPlan | null {
  if (fs.existsSync(lockFilePath)) {
    const data = fs.readFileSync(lockFilePath, 'utf8');
    return JSON.parse(data) as InstallationPlan;
  }
  return null;
}
