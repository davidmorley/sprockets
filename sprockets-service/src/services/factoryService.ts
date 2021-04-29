import pool from "../db";
import { groupBy } from "lodash";

export const getFactoryData = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM factory_sprocket_production ORDER BY id, produced_at"
  );

  const factoryData = groupBy(rows, (row) => row.factory_id);

  const factories = Object.keys(factoryData).reduce<FactoryData[]>(
    (accum, curr) => {
      return [
        ...accum,
        {
          factory: {
            id: Number.parseInt(curr),
            chart_data: {
              ...generateChartData(factoryData[curr]),
            },
          },
        },
      ];
    },
    []
  );

  return factories;
};

export const getFactoryDataForFactoryId = async (factoryId: number) => {
  const {
    rows,
  } = await pool.query(
    "SELECT * FROM factory_sprocket_production WHERE factory_id = $1 ORDER BY id, produced_at",
    [factoryId]
  );

  if (rows.length === 0) {
    throw new Error(`No factory found with id ${factoryId}`);
  }

  return {
    id: factoryId,
    chart_data: {
      ...generateChartData(rows),
    },
  };
};

const generateChartData = (
  readings: {
    id: number;
    factory_id: number;
    produced_at: string;
    goal: number;
    actual: number;
  }[]
) => {
  const sprocket_production_actual = readings.reduce<number[]>(
    (actual_accum, reading) => [...actual_accum, reading.actual],
    []
  );

  const sprocket_production_goal = readings.reduce<number[]>(
    (goal_accum, reading) => [...goal_accum, reading.goal],
    []
  );

  const time = readings.reduce<number[]>(
    (time_accum, reading) => [
      ...time_accum,
      Date.parse(reading.produced_at) / 1000,
    ],
    []
  );

  return { sprocket_production_actual, sprocket_production_goal, time };
};
