import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { Roles } from '../common/decorators/roles.decorator';
import { SWAGGER_ACCESS_TOKEN } from '../swagger/swagger.constants';
import { UserRole } from '../users/enums/user-role.enum';
import { AmenitiesService } from './amenities.service';

class CreateAmenityDto {
  @ApiProperty({ example: 'Piscina' })
  @IsString()
  @MaxLength(100)
  name!: string;
}

class AmenityDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;
}

@ApiTags('Amenities')
@ApiBearerAuth(SWAGGER_ACCESS_TOKEN)
@Controller('amenities')
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar amenities disponibles' })
  @ApiOkResponse({ type: [AmenityDto] })
  findAll() {
    return this.amenitiesService.findAll();
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Crear amenity (ADMIN)' })
  @ApiCreatedResponse({ type: AmenityDto })
  create(@Body() dto: CreateAmenityDto) {
    return this.amenitiesService.create(dto.name);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar amenity (ADMIN)' })
  @ApiNoContentResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.amenitiesService.remove(id.toString());
  }
}
