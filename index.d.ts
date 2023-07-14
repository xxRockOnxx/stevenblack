declare module 'stevenblack' {
  import fs from 'fs';
  export function stream(): fs.ReadStream;
  export async function isBlacklisted(domain: string): Promise<boolean>;
}
