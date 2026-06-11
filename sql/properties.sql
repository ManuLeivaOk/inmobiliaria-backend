-- Propiedades, amenities y geografía

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'property_operation_enum') THEN
    CREATE TYPE property_operation_enum AS ENUM ('VENTA', 'ALQUILER', 'ALQUILER_TEMPORAL');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'property_type_enum') THEN
    CREATE TYPE property_type_enum AS ENUM ('CASA', 'DEPARTAMENTO', 'LOCAL', 'TERRENO', 'OFICINA', 'COCHERA', 'PH', 'QUINTA');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'currency_enum') THEN
    CREATE TYPE currency_enum AS ENUM ('ARS', 'USD', 'EUR');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'property_status_enum') THEN
    CREATE TYPE property_status_enum AS ENUM ('BORRADOR', 'PUBLICADA', 'RESERVADA', 'VENDIDA', 'ALQUILADA', 'INACTIVA');
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS countries (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS provinces (
  id BIGSERIAL PRIMARY KEY,
  country_id BIGINT NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS cities (
  id BIGSERIAL PRIMARY KEY,
  province_id BIGINT NOT NULL REFERENCES provinces(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS neighborhoods (
  id BIGSERIAL PRIMARY KEY,
  city_id BIGINT NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS amenities (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  operation_type property_operation_enum NOT NULL,
  property_type property_type_enum NOT NULL,
  price NUMERIC(14,2) NOT NULL,
  currency currency_enum NOT NULL,
  address VARCHAR(255),
  country_id BIGINT REFERENCES countries(id),
  province_id BIGINT REFERENCES provinces(id),
  city_id BIGINT REFERENCES cities(id),
  neighborhood_id BIGINT REFERENCES neighborhoods(id),
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7),
  rooms SMALLINT,
  bedrooms SMALLINT,
  bathrooms SMALLINT,
  garage BOOLEAN DEFAULT FALSE,
  covered_area NUMERIC(10,2),
  total_area NUMERIC(10,2),
  property_age SMALLINT,
  floor_number SMALLINT,
  status property_status_enum NOT NULL DEFAULT 'BORRADOR',
  published_at TIMESTAMP,
  assigned_seller_id UUID REFERENCES users(id),
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_properties_status ON properties (status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties (city_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_properties_seller ON properties (assigned_seller_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_properties_created_by ON properties (created_by) WHERE deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS property_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  is_cover BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS property_amenities (
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  amenity_id BIGINT NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
  PRIMARY KEY (property_id, amenity_id)
);

CREATE TABLE IF NOT EXISTS property_features (
  id BIGSERIAL PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  feature_key VARCHAR(100) NOT NULL,
  feature_value TEXT NOT NULL
);

-- Seed geografía Argentina — Córdoba / Río Cuarto
INSERT INTO countries (name) VALUES ('Argentina')
ON CONFLICT (name) DO NOTHING;

INSERT INTO provinces (country_id, name)
SELECT c.id, 'Córdoba'
FROM countries c
WHERE c.name = 'Argentina'
  AND NOT EXISTS (
    SELECT 1 FROM provinces p
    WHERE p.country_id = c.id AND p.name = 'Córdoba'
  );

INSERT INTO cities (province_id, name)
SELECT pr.id, 'Río Cuarto'
FROM provinces pr
JOIN countries co ON co.id = pr.country_id
WHERE co.name = 'Argentina' AND pr.name = 'Córdoba'
  AND NOT EXISTS (
    SELECT 1 FROM cities ci
    WHERE ci.province_id = pr.id AND ci.name = 'Río Cuarto'
  );

INSERT INTO neighborhoods (city_id, name)
SELECT ci.id, n.name
FROM cities ci
JOIN provinces pr ON pr.id = ci.province_id
CROSS JOIN (VALUES ('Barrio Centro'), ('Barrio Alberdi'), ('Barrio Parque')) AS n(name)
WHERE pr.name = 'Córdoba' AND ci.name = 'Río Cuarto'
  AND NOT EXISTS (
    SELECT 1 FROM neighborhoods nb
    WHERE nb.city_id = ci.id AND nb.name = n.name
  );

INSERT INTO amenities (name) VALUES
  ('Piscina'),
  ('Gimnasio'),
  ('SUM'),
  ('Balcón'),
  ('Terraza'),
  ('Aire acondicionado'),
  ('Calefacción'),
  ('Amoblado'),
  ('Mascotas permitidas'),
  ('Cochera cubierta')
ON CONFLICT (name) DO NOTHING;
