import pool from "../db";

export const getSprocketById = async (sprocketId: number) => {
  const { rows } = await pool.query("SELECT * FROM sprocket WHERE id = $1", [
    sprocketId,
  ]);

  if (rows.length === 0) {
    throw new Error(`No sprocket found with id ${sprocketId}`);
  }

  return rows[0] as Sprocket;
};

export const createSprocket = async (sprocket: Sprocket) => {
  const { teeth, pitchDiameter, outsideDiameter, pitch } = sprocket;
  const {
    rows,
  } = await pool.query(
    "INSERT INTO sprocket (teeth, pitch_diameter, outside_diameter, pitch) VALUES ($1, $2, $3, $4) RETURNING id",
    [teeth, pitchDiameter, outsideDiameter, pitch]
  );

  const createdSprocketId = rows[0].id;

  return createdSprocketId;
};

export const updateSprocket = async (sprocket: Sprocket) => {
  const { teeth, pitchDiameter, outsideDiameter, pitch, id } = sprocket;
  const {
    rowCount,
  } = await pool.query(
    "UPDATE sprocket SET teeth = $1, pitch_diameter = $2, outside_diameter = $3, pitch = $4 WHERE id = $5",
    [teeth, pitchDiameter, outsideDiameter, pitch, id]
  );

  if (rowCount === 0) {
    throw new Error(`No sprocket found with id ${id}`);
  }
};
