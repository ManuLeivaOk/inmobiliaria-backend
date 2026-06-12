import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { Country } from './entities/country.entity';
import { Neighborhood } from './entities/neighborhood.entity';
import { Province } from './entities/province.entity';

// --- DTOs de creación ---
export interface CreateCountryDto {
  name: string;
}
export interface CreateProvinceDto {
  name: string;
  countryId: string;
}
export interface CreateCityDto {
  name: string;
  provinceId: string;
}
export interface CreateNeighborhoodDto {
  name: string;
  cityId: string;
}

// --- DTOs de actualización (todos los campos opcionales) ---
export type UpdateCountryDto = Partial<CreateCountryDto>;
export type UpdateProvinceDto = Partial<CreateProvinceDto>;
export type UpdateCityDto = Partial<CreateCityDto>;
export type UpdateNeighborhoodDto = Partial<CreateNeighborhoodDto>;

@Injectable()
export class GeoService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,
    @InjectRepository(Province)
    private readonly provinceRepo: Repository<Province>,
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>,
    @InjectRepository(Neighborhood)
    private readonly neighborhoodRepo: Repository<Neighborhood>,
  ) {}

  // ─────────────────────────── COUNTRIES ───────────────────────────

  findCountries() {
    return this.countryRepo.find({ order: { name: 'ASC' } });
  }

  async findOneCountry(id: number) {
    const country = await this.countryRepo.findOneBy({ id } as any);
    if (!country)
      throw new NotFoundException(`País con id ${id} no encontrado`);
    return country;
  }

  createCountry(dto: CreateCountryDto) {
    const country = this.countryRepo.create(dto);
    return this.countryRepo.save(country);
  }

  async updateCountry(id: number, dto: UpdateCountryDto) {
    const country = await this.findOneCountry(id);
    Object.assign(country, dto);
    return this.countryRepo.save(country);
  }

  async removeCountry(id: number) {
    const country = await this.findOneCountry(id);
    return this.countryRepo.remove(country);
  }

  // ─────────────────────────── PROVINCES ───────────────────────────

  findProvinces(countryId?: string) {
    return this.provinceRepo.find({
      where: countryId ? { countryId } : {},
      order: { name: 'ASC' },
    });
  }

  async findOneProvince(id: number) {
    const province = await this.provinceRepo.findOneBy({ id } as any);
    if (!province)
      throw new NotFoundException(`Provincia con id ${id} no encontrada`);
    return province;
  }

  createProvince(dto: CreateProvinceDto) {
    const province = this.provinceRepo.create(dto);
    return this.provinceRepo.save(province);
  }

  async updateProvince(id: number, dto: UpdateProvinceDto) {
    const province = await this.findOneProvince(id);
    Object.assign(province, dto);
    return this.provinceRepo.save(province);
  }

  async removeProvince(id: number) {
    const province = await this.findOneProvince(id);
    return this.provinceRepo.remove(province);
  }

  // ──────────────────────────── CITIES ─────────────────────────────

  findCities(provinceId?: string) {
    return this.cityRepo.find({
      where: provinceId ? { provinceId } : {},
      order: { name: 'ASC' },
    });
  }

  async findOneCity(id: number) {
    const city = await this.cityRepo.findOneBy({ id } as any);
    if (!city) throw new NotFoundException(`Ciudad con id ${id} no encontrada`);
    return city;
  }

  createCity(dto: CreateCityDto) {
    const city = this.cityRepo.create(dto);
    return this.cityRepo.save(city);
  }

  async updateCity(id: number, dto: UpdateCityDto) {
    const city = await this.findOneCity(id);
    Object.assign(city, dto);
    return this.cityRepo.save(city);
  }

  async removeCity(id: number) {
    const city = await this.findOneCity(id);
    return this.cityRepo.remove(city);
  }

  // ───────────────────────── NEIGHBORHOODS ─────────────────────────

  findNeighborhoods(cityId?: string) {
    return this.neighborhoodRepo.find({
      where: cityId ? { cityId } : {},
      order: { name: 'ASC' },
    });
  }

  async findOneNeighborhood(id: number) {
    const neighborhood = await this.neighborhoodRepo.findOneBy({ id } as any);
    if (!neighborhood)
      throw new NotFoundException(`Barrio con id ${id} no encontrado`);
    return neighborhood;
  }

  createNeighborhood(dto: CreateNeighborhoodDto) {
    const neighborhood = this.neighborhoodRepo.create(dto);
    return this.neighborhoodRepo.save(neighborhood);
  }

  async updateNeighborhood(id: number, dto: UpdateNeighborhoodDto) {
    const neighborhood = await this.findOneNeighborhood(id);
    Object.assign(neighborhood, dto);
    return this.neighborhoodRepo.save(neighborhood);
  }

  async removeNeighborhood(id: number) {
    const neighborhood = await this.findOneNeighborhood(id);
    return this.neighborhoodRepo.remove(neighborhood);
  }
}
