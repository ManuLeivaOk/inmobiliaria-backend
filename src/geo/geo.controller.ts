import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { SWAGGER_ACCESS_TOKEN } from '../swagger/swagger.constants';
import { GeoService } from './geo.service';

class GeoItemDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;
}

class GeoQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  countryId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  provinceId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  cityId?: number;
}

@ApiTags('Geografía')
@ApiBearerAuth(SWAGGER_ACCESS_TOKEN)
@Controller('geo')
export class GeoController {
  constructor(private readonly geoService: GeoService) {}

  @Get('countries')
  @ApiOperation({ summary: 'Listar países' })
  @ApiOkResponse({ type: [GeoItemDto] })
  countries() {
    return this.geoService.findCountries();
  }

  @Get('provinces')
  @ApiOperation({ summary: 'Listar provincias' })
  @ApiQuery({ name: 'countryId', required: false, type: Number })
  @ApiOkResponse({ type: [GeoItemDto] })
  provinces(@Query('countryId') countryId?: string) {
    return this.geoService.findProvinces(countryId);
  }

  @Get('cities')
  @ApiOperation({ summary: 'Listar ciudades' })
  @ApiQuery({ name: 'provinceId', required: false, type: Number })
  @ApiOkResponse({ type: [GeoItemDto] })
  cities(@Query('provinceId') provinceId?: string) {
    return this.geoService.findCities(provinceId);
  }

  @Get('neighborhoods')
  @ApiOperation({ summary: 'Listar barrios' })
  @ApiQuery({ name: 'cityId', required: false, type: Number })
  @ApiOkResponse({ type: [GeoItemDto] })
  neighborhoods(@Query('cityId') cityId?: string) {
    return this.geoService.findNeighborhoods(cityId);
  }
}
