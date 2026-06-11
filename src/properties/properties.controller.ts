import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SWAGGER_ACCESS_TOKEN } from '../swagger/swagger.constants';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface';
import { CreatePropertyDto } from './dto/create-property.dto';
import {
  PaginatedPropertyResponseDto,
  PropertyResponseDto,
} from './dto/property-response.dto';
import { QueryPropertyDto } from './dto/query-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertiesService } from './properties.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { plainToInstance } from 'class-transformer';
import {
  MAX_FILES,
  MAX_FILE_SIZE,
} from '../modules/uploads/utils/uploads.constants';
import { UploadsService } from '../modules/uploads/services/uploads.service';
import { PropertyImageInputDto } from './dto/property-nested.dto';

type ImageMetadata = {
  position: number;
  isCover: boolean;
};

@ApiTags('Propiedades')
@ApiBearerAuth(SWAGGER_ACCESS_TOKEN)
@Controller('properties')
export class PropertiesController {
  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly uploadsService: UploadsService,
  ) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', MAX_FILES, {
      storage: memoryStorage(),
      limits: {
        fileSize: MAX_FILE_SIZE,
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Crear propiedad',
  })
  @ApiCreatedResponse({
    type: PropertyResponseDto,
  })
  async create(
    @UploadedFiles()
    files: Express.Multer.File[],
    @Body('data')
    rawData: string,
    @CurrentUser()
    user: AuthenticatedUser,
    @Body('imagesMetadata')
    imagesMetadata: string[],
  ) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(rawData);
    } catch {
      throw new BadRequestException('Payload inválido');
    }

    const dto = plainToInstance(CreatePropertyDto, parsed);

    const uploadedFiles = await this.uploadsService.uploadPropertyImages(files);

    const parsedMetadata: ImageMetadata[] = Array.isArray(imagesMetadata)
      ? imagesMetadata.map((item) => {
          const parsed = JSON.parse(item) as ImageMetadata;

          return {
            position: parsed.position,
            isCover: parsed.isCover,
          };
        })
      : [];

    const images: PropertyImageInputDto[] = uploadedFiles.map(
      (file, index) => ({
        imageUrl: file.url,
        position: parsedMetadata[index]?.position ?? index,
        isCover: parsedMetadata[index]?.isCover ?? false,
      }),
    );

    if (!images.some((img) => img.isCover) && images.length > 0) {
      images[0].isCover = true;
    }

    dto.images = images;

    return this.propertiesService.create(dto, user);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar propiedades',
    description:
      'ADMIN ve todo. VENDEDOR ve publicadas + las propias/asignadas.',
  })
  @ApiOkResponse({ type: PaginatedPropertyResponseDto })
  findAll(
    @Query() query: QueryPropertyDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.propertiesService.findAll(query, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener propiedad por ID' })
  @ApiOkResponse({ type: PropertyResponseDto })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.propertiesService.findOne(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar propiedad' })
  @ApiOkResponse({ type: PropertyResponseDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePropertyDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.propertiesService.update(id, dto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar propiedad (soft delete)' })
  @ApiNoContentResponse()
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.propertiesService.remove(id, user);
  }
}
