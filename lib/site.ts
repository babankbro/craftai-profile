// Keep Next.js routing and public asset URLs on the same deployment prefix.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/team";

export function publicAsset(path: string): string {
  return `${BASE_PATH}${path}`;
}
