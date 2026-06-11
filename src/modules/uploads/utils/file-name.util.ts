import { randomUUID } from 'crypto';

export function generateFileName(): string {
  return `${Date.now()}-${randomUUID()}.webp`;
}
