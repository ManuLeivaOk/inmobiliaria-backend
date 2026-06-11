import {
  BadRequestException,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { FilesInterceptor } from '@nestjs/platform-express';

import { memoryStorage } from 'multer';

import { ApiConsumes, ApiTags } from '@nestjs/swagger';

import { UploadsService } from '../services/uploads.service';

import { MAX_FILES, MAX_FILE_SIZE } from '../utils/uploads.constants';

import { UploadedFileResponseDto } from '../dto/upload-response.dto';

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('properties')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('files', MAX_FILES, {
      storage: memoryStorage(),
      limits: {
        fileSize: MAX_FILE_SIZE,
      },
    }),
  )
  async uploadPropertyImages(
    @UploadedFiles()
    files: Express.Multer.File[],
  ): Promise<UploadedFileResponseDto[]> {
    if (!files?.length) {
      throw new BadRequestException('Debés enviar al menos una imagen');
    }

    return this.uploadsService.uploadPropertyImages(files);
  }
}
