import {
  AvailableService,
  Currency,
  PropertyOperationType,
  PropertyStatus,
  PropertyType,
} from '../properties/enums/property.enums';

export type SeedNeighborhoodName =
  | 'Barrio Centro'
  | 'Barrio Alberdi'
  | 'Barrio Parque';

export interface SeedPropertyDefinition {
  title: string;
  description: string;
  operationType: PropertyOperationType;
  propertyType: PropertyType;
  price: number;
  currency: Currency;
  status: PropertyStatus;
  address: string;
  neighborhoodName: SeedNeighborhoodName;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  garage?: boolean;
  coveredArea?: number;
  totalArea?: number;
  propertyAge?: number;
  floorNumber?: number;
  latitude?: number;
  longitude?: number;
  imageUrl: string;
  features?: { featureKey: string; featureValue: string }[];
  suitableForMortgageCredit?: boolean;
  availableServices?: AvailableService[];
  weHaveTheKey?: boolean;
  contact?: string;
  publicationLink?: string;
  assignedToVendedor?: boolean;
}

export const SEED_AMENITIES = [
  'Piscina',
  'Gimnasio',
  'SUM',
  'Balcón',
  'Terraza',
  'Aire acondicionado',
  'Calefacción',
  'Amoblado',
  'Mascotas permitidas',
  'Cochera cubierta',
] as const;

export const SEED_PROPERTIES: SeedPropertyDefinition[] = [
  {
    title: 'Casa 3 dormitorios en Barrio Centro',
    description:
      'Casa amplia con patio, living comedor, cocina equipada y garage para dos vehículos. Ideal familia.',
    operationType: PropertyOperationType.VENTA,
    propertyType: PropertyType.CASA,
    price: 95000,
    currency: Currency.USD,
    status: PropertyStatus.PUBLICADA,
    address: 'San Martín 1250',
    neighborhoodName: 'Barrio Centro',
    rooms: 5,
    bedrooms: 3,
    bathrooms: 2,
    garage: true,
    coveredArea: 180,
    totalArea: 320,
    propertyAge: 8,
    latitude: -33.1235,
    longitude: -64.3498,
    imageUrl: '/uploads/properties/8fc19c90-b94a-4c3a-b181-309f40658e1f.webp',

    suitableForMortgageCredit: true,

    availableServices: [
      AvailableService.AGUA,
      AvailableService.LUZ,
      AvailableService.GAS,
      AvailableService.CLOACAS,
      AvailableService.PAVIMENTO,
    ],

    weHaveTheKey: true,

    contact: '+54 9 358 4123456',

    publicationLink:
      'https://www.zonaprop.com.ar/propiedades/casa-barrio-centro-1',

    features: [
      { featureKey: 'orientacion', featureValue: 'Norte' },
      { featureKey: 'expensas', featureValue: 'No aplica' },
    ],

    assignedToVendedor: true,
  },

  {
    title: 'Departamento 2 amb en Barrio Alberdi',
    description:
      'Departamento luminoso a estrenar, balcón al frente, cocina integrada y amenities del edificio.',
    operationType: PropertyOperationType.ALQUILER,
    propertyType: PropertyType.DEPARTAMENTO,
    price: 450000,
    currency: Currency.ARS,
    status: PropertyStatus.PUBLICADA,
    address: 'Alberdi 890, 4° B',
    neighborhoodName: 'Barrio Alberdi',
    rooms: 2,
    bedrooms: 1,
    bathrooms: 1,
    garage: false,
    coveredArea: 55,
    totalArea: 55,
    propertyAge: 0,
    floorNumber: 4,
    latitude: -33.1312,
    longitude: -64.3551,
    imageUrl: '/uploads/properties/8fc19c90-b94a-4c3a-b181-309f40658e1f.webp',

    suitableForMortgageCredit: false,

    availableServices: [
      AvailableService.AGUA,
      AvailableService.LUZ,
      AvailableService.GAS,
      AvailableService.CLOACAS,
    ],

    weHaveTheKey: false,

    contact: '+54 9 358 4987654',

    publicationLink: 'https://www.zonaprop.com.ar/propiedades/depto-alberdi-2',

    features: [{ featureKey: 'mascotas', featureValue: 'Consultar' }],

    assignedToVendedor: true,
  },

  {
    title: 'Local comercial sobre Av. Circunvalación',
    description:
      'Local a la calle con vidriera, baño y depósito. Zona comercial de alto tránsito en Barrio Parque.',
    operationType: PropertyOperationType.VENTA,
    propertyType: PropertyType.LOCAL,
    price: 120000,
    currency: Currency.USD,
    status: PropertyStatus.BORRADOR,
    address: 'Av. Circunvalación 2100',
    neighborhoodName: 'Barrio Parque',
    rooms: 1,
    bathrooms: 1,
    garage: false,
    coveredArea: 95,
    totalArea: 95,
    propertyAge: 15,
    latitude: -33.1189,
    longitude: -64.3412,
    imageUrl: '/uploads/properties/8fc19c90-b94a-4c3a-b181-309f40658e1f.webp',

    suitableForMortgageCredit: false,

    availableServices: [
      AvailableService.AGUA,
      AvailableService.LUZ,
      AvailableService.PAVIMENTO,
    ],

    weHaveTheKey: true,

    contact: '+54 9 358 4556677',

    publicationLink:
      'https://www.zonaprop.com.ar/propiedades/local-circunvalacion-3',

    features: [{ featureKey: 'frente', featureValue: '12 m' }],

    assignedToVendedor: false,
  },
];
