import { Router } from "express";
import { isNumber } from "lodash";
import logger from "../config/logging";
import {
  createSprocket,
  getSprocketById,
  updateSprocket,
} from "../services/sprocketService";

const router = Router();

router.get("/:sprocket_id", async (req, res) => {
  const { sprocket_id: sprocketId } = req.params;
  logger.info(`⚙️  Fetching sprocket ${sprocketId}`);

  try {
    const sprocket = await getSprocketById(Number.parseInt(sprocketId));
    return res.send({ sprocket });
  } catch (e) {
    logger.error(e);
    return res
      .status(404)
      .send({ message: `No sprocket found with id ${sprocketId}` });
  }
});

router.post("/", async (req, res) => {
  logger.info(`⚙️  Creating new sprocket`);

  const {
    teeth,
    pitch_diameter: pitchDiameter,
    outside_diameter: outsideDiameter,
    pitch,
  } = req.body;

  const sprocket = { teeth, pitchDiameter, outsideDiameter, pitch } as Sprocket;

  if (!isValidSprocket(sprocket)) {
    logger.error("⚙️  Not a valid sprocket");
    return res.status(400).send({ message: "Not a valid sprocket" });
  }

  const createdSprocketId = await createSprocket(sprocket);
  const createdSprocketUri = `${req.protocol}://${req.get("host")}${
    req.originalUrl
  }/${createdSprocketId}`;

  res.set({ Location: createdSprocketUri }).status(201).send();
});

router.put("/:sprocket_id", async (req, res) => {
  const { sprocket_id: sprocketId } = req.params;
  logger.info(`⚙️  Updating sprocket ${sprocketId}`);

  const {
    teeth,
    pitch_diameter: pitchDiameter,
    outside_diameter: outsideDiameter,
    pitch,
  } = req.body;

  const sprocket = {
    id: Number.parseInt(sprocketId),
    teeth,
    pitchDiameter,
    outsideDiameter,
    pitch,
  } as Sprocket;

  if (!isValidSprocket(sprocket)) {
    logger.error("⚙️  Not a valid sprocket");
    return res.status(400).send({ message: "Not a valid sprocket" });
  }
  try {
    await updateSprocket(sprocket);
    return res.status(204).send();
  } catch (e) {
    logger.error(e);
    return res
      .status(404)
      .send({ message: `No sprocket found with id ${sprocketId}` });
  }
});

const isValidSprocket = (sprocket: Sprocket) => {
  const { teeth, pitchDiameter, outsideDiameter, pitch } = sprocket;

  return (
    isNumber(teeth) &&
    isNumber(pitchDiameter) &&
    isNumber(outsideDiameter) &&
    isNumber(pitch)
  );
};

export default router;
