import { Router } from "express";
import logger from "../config/logging";
import {
  getFactoryData,
  getFactoryDataForFactoryId,
} from "../services/factoryService";

const router = Router();

router.get("/", async (_, res) => {
  logger.info("🏭  Fetching all factory data");
  const factories = await getFactoryData();

  const response = {
    factories,
  };

  return res.send(response);
});

router.get("/:factory_id", async (req, res) => {
  const factoryId = Number.parseInt(req.params.factory_id);
  logger.info(`🏭  Fetching factory data for factory ${factoryId}`);

  try {
    const factoryData = await getFactoryDataForFactoryId(factoryId);

    const response = {
      factory: {
        ...factoryData,
      },
    };

    return res.send(response);
  } catch (e) {
    logger.error(e);
    return res
      .status(404)
      .send({ message: `No factory found with id ${factoryId}` });
  }
});

export default router;
