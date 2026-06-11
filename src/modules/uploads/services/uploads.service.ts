import { BadRequestException, Injectable } from '@nestjs/common';

import * as fs from 'fs/promises';
import * as path from 'path';
import sharp from 'sharp';

import { UploadedFileResponseDto } from '../dto/upload-response.dto';

import { ALLOWED_MIME_TYPES } from '../utils/uploads.constants';

import {
  buildPropertyUploadPath,
  ensureDirectoryExists,
  resolvePropertyImagePath,
  toPublicUploadUrl,
} from '../utils/uploads-path.util';

import { generateFileName } from '../utils/file-name.util';

@Injectable()
export class UploadsService {
  async uploadPropertyImages(
    files: Express.Multer.File[],
  ): Promise<UploadedFileResponseDto[]> {
    if (!files?.length) {
      return [];
    }

    const uploadDir = buildPropertyUploadPath();

    ensureDirectoryExists(uploadDir);

    const uploadedFiles: UploadedFileResponseDto[] = [];

    for (const file of files) {
      this.validateFile(file);

      const fileName = generateFileName();

      const absolutePath = path.join(uploadDir, fileName);

      const image = sharp(file.buffer, {
        failOn: 'error',
      });

      const metadata = await image.metadata();

      const processedBuffer = await image
        .rotate()
        .resize({
          width: 1600,
          withoutEnlargement: true,
        })
        .webp({
          quality: 72,
          effort: 4,
        })
        .toBuffer();

      await fs.writeFile(absolutePath, processedBuffer);

      uploadedFiles.push({
        url: toPublicUploadUrl(absolutePath),
        width: metadata.width ?? 0,
        height: metadata.height ?? 0,
        size: processedBuffer.length,
      });
    }

    return uploadedFiles;
  }

  async deletePropertyImages(imageUrls: string[]): Promise<void> {
    if (!imageUrls.length) {
      return;
    }

    await Promise.all(
      imageUrls.map(async (imageUrl) => {
        try {
          const filePath = resolvePropertyImagePath(imageUrl);
          await fs.unlink(filePath);
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
            throw error;
          }
        }
      }),
    );
  }

  private validateFile(file: Express.Multer.File): void {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(`Formato inválido: ${file.mimetype}`);
    }
  }
}
