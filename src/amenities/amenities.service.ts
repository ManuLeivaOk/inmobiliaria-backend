import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Amenity } from './entities/amenity.entity';

@Injectable()
export class AmenitiesService {
  constructor(
    @InjectRepository(Amenity)
    private readonly amenityRepo: Repository<Amenity>,
  ) {}

  findAll() {
    return this.amenityRepo.find({ order: { name: 'ASC' } });
  }

  async create(name: string) {
    const amenity = this.amenityRepo.create({ name: name.trim() });
    return this.amenityRepo.save(amenity);
  }

  async remove(id: string) {
    const result = await this.amenityRepo.delete(id);
    if (!result.affected) {
      throw new NotFoundException('Amenity no encontrado');
    }
  }
}
