export interface CacheEntry {
  name: string;
  version: string;
  path: string;
  packageJson: Record<string, any>; // Represents the package.json content
}

export interface DependencyInfo {
  name: string;
  version: string;
  dependencies?: Record<string, string>; // Dependency names and version ranges
}
