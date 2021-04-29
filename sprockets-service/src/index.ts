import express from "express";
import logger from "./config/logging";
import routes from "./routes";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/factories", routes.factories);
app.use("/sprockets", routes.sprockets);

app.listen(PORT, async () => {
  logger.info(`⚡  Server started on port ${PORT}`);
});
