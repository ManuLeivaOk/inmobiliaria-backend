import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadsModule } from '../modules/uploads/uploads.module';
import { Amenity } from '../amenities/entities/amenity.entity';
import { User } from '../users/entities/user.entity';
import { PropertyAmenity } from './entities/property-amenity.entity';
import { PropertyFeature } from './entities/property-feature.entity';
import { PropertyImage } from './entities/property-image.entity';
import { Property } from './entities/property.entity';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';

@Module({
  imports: [
    UploadsModule,
    TypeOrmModule.forFeature([
      Property,
      PropertyImage,
      PropertyAmenity,
      PropertyFeature,
      Amenity,
      User,
    ]),
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [PropertiesService],
})
export class PropertiesModule {}
