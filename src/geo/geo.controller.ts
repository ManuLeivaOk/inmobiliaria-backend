import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SWAGGER_ACCESS_TOKEN } from '../swagger/swagger.constants';
import { GeoService } from './geo.service';

// ─────────────────────────── Response DTO ────────────────────────────

class GeoItemDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;
}

// ─────────────────────────── Query DTOs ──────────────────────────────

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

// ─────────────────────────── Create DTOs ─────────────────────────────

class CreateCountryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;
}

class CreateProvinceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  countryId!: number;
}

class CreateCityDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  provinceId!: number;
}

class CreateNeighborhoodDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  cityId!: number;
}

// ─────────────────────────── Update DTOs ─────────────────────────────

class UpdateCountryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;
}

class UpdateProvinceDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  countryId?: number;
}

class UpdateCityDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  provinceId?: number;
}

class UpdateNeighborhoodDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  cityId?: number;
}

// ─────────────────────────── Controller ──────────────────────────────

@ApiTags('Geografía')
@ApiBearerAuth(SWAGGER_ACCESS_TOKEN)
@Controller('geo')
export class GeoController {
  constructor(private readonly geoService: GeoService) {}

  // ──────────────────────── COUNTRIES ──────────────────────────────

  @Get('countries')
  @ApiOperation({ summary: 'Listar países' })
  @ApiOkResponse({ type: [GeoItemDto] })
  countries() {
    return this.geoService.findCountries();
  }

  @Post('countries')
  @ApiOperation({ summary: 'Crear país' })
  @ApiCreatedResponse({ type: GeoItemDto })
  createCountry(@Body() dto: CreateCountryDto) {
    return this.geoService.createCountry(dto);
  }

  @Patch('countries/:id')
  @ApiOperation({ summary: 'Actualizar país' })
  @ApiOkResponse({ type: GeoItemDto })
  updateCountry(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCountryDto,
  ) {
    return this.geoService.updateCountry(id, dto);
  }

  @Delete('countries/:id')
  @ApiOperation({ summary: 'Eliminar país' })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  removeCountry(@Param('id', ParseIntPipe) id: number) {
    return this.geoService.removeCountry(id);
  }

  // ──────────────────────── PROVINCES ──────────────────────────────

  @Get('provinces')
  @ApiOperation({ summary: 'Listar provincias' })
  @ApiQuery({ name: 'countryId', required: false, type: Number })
  @ApiOkResponse({ type: [GeoItemDto] })
  provinces(@Query('countryId') countryId?: string) {
    return this.geoService.findProvinces(countryId);
  }

  @Post('provinces')
  @ApiOperation({ summary: 'Crear provincia' })
  @ApiCreatedResponse({ type: GeoItemDto })
  createProvince(@Body() dto: CreateProvinceDto) {
    return this.geoService.createProvince(dto as any);
  }

  @Patch('provinces/:id')
  @ApiOperation({ summary: 'Actualizar provincia' })
  @ApiOkResponse({ type: GeoItemDto })
  updateProvince(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProvinceDto,
  ) {
    return this.geoService.updateProvince(id, dto as any);
  }

  @Delete('provinces/:id')
  @ApiOperation({ summary: 'Eliminar provincia' })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  removeProvince(@Param('id', ParseIntPipe) id: number) {
    return this.geoService.removeProvince(id);
  }

  // ────────────────────────── CITIES ───────────────────────────────

  @Get('cities')
  @ApiOperation({ summary: 'Listar ciudades' })
  @ApiQuery({ name: 'provinceId', required: false, type: Number })
  @ApiOkResponse({ type: [GeoItemDto] })
  cities(@Query('provinceId') provinceId?: string) {
    return this.geoService.findCities(provinceId);
  }

  @Post('cities')
  @ApiOperation({ summary: 'Crear ciudad' })
  @ApiCreatedResponse({ type: GeoItemDto })
  createCity(@Body() dto: CreateCityDto) {
    return this.geoService.createCity(dto as any);
  }

  @Patch('cities/:id')
  @ApiOperation({ summary: 'Actualizar ciudad' })
  @ApiOkResponse({ type: GeoItemDto })
  updateCity(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCityDto,
  ) {
    return this.geoService.updateCity(id, dto as any);
  }

  @Delete('cities/:id')
  @ApiOperation({ summary: 'Eliminar ciudad' })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  removeCity(@Param('id', ParseIntPipe) id: number) {
    return this.geoService.removeCity(id);
  }

  // ─────────────────────── NEIGHBORHOODS ───────────────────────────

  @Get('neighborhoods')
  @ApiOperation({ summary: 'Listar barrios' })
  @ApiQuery({ name: 'cityId', required: false, type: Number })
  @ApiOkResponse({ type: [GeoItemDto] })
  neighborhoods(@Query('cityId') cityId?: string) {
    return this.geoService.findNeighborhoods(cityId);
  }

  @Post('neighborhoods')
  @ApiOperation({ summary: 'Crear barrio' })
  @ApiCreatedResponse({ type: GeoItemDto })
  createNeighborhood(@Body() dto: CreateNeighborhoodDto) {
    return this.geoService.createNeighborhood(dto as any);
  }

  @Patch('neighborhoods/:id')
  @ApiOperation({ summary: 'Actualizar barrio' })
  @ApiOkResponse({ type: GeoItemDto })
  updateNeighborhood(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNeighborhoodDto,
  ) {
    return this.geoService.updateNeighborhood(id, dto as any);
  }

  @Delete('neighborhoods/:id')
  @ApiOperation({ summary: 'Eliminar barrio' })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  removeNeighborhood(@Param('id', ParseIntPipe) id: number) {
    return this.geoService.removeNeighborhood(id);
  }
}
