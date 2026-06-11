import { BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

import { PROPERTY_UPLOADS_PATH } from './uploads.constants';

export function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function buildPropertyUploadPath(): string {
  const now = new Date();

  const year = now.getFullYear().toString();
  const month = String(now.getMonth() + 1).padStart(2, '0');

  return path.join(process.cwd(), PROPERTY_UPLOADS_PATH, year, month);
}

export function resolvePropertyImagePath(imageUrl: string): string {
  const normalized = imageUrl.replace(/\\/g, '/');

  if (!normalized.startsWith('/uploads/properties/')) {
    throw new BadRequestException('URL de imagen inválida');
  }

  const relativePath = normalized.replace(/^\//, '');
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const uploadsRoot = path.resolve(process.cwd(), PROPERTY_UPLOADS_PATH);

  if (
    !absolutePath.startsWith(`${uploadsRoot}${path.sep}`) &&
    absolutePath !== uploadsRoot
  ) {
    throw new BadRequestException('URL de imagen inválida');
  }

  return absolutePath;
}

export function toPublicUploadUrl(absolutePath: string): string {
  return absolutePath
    .replace(process.cwd(), '')
    .replace(/\\/g, '/');
}
