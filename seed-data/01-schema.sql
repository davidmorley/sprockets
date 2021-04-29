\c sprockets;

CREATE TABLE IF NOT EXISTS factory_sprocket_production (
  id SERIAL PRIMARY KEY,
  factory_id INTEGER NOT NULL,
  produced_at TIMESTAMP WITH TIME ZONE NOT NULL,
  goal INTEGER NOT NULL,
  actual INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS sprocket (
  id SERIAL PRIMARY KEY,
  teeth INTEGER NOT NULL,
  pitch_diameter INTEGER NOT NULL,
  outside_diameter INTEGER NOT NULL,
  pitch INTEGER NOT NULL
);
