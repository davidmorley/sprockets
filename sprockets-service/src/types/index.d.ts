interface ChartData {
  sprocket_production_actual: number[];
  sprocket_production_goal: number[];
  time: number[];
}

interface FactoryData {
  factory: {
    chart_data: ChartData;
  };
}

interface Sprocket {
  id?: number;
  teeth: number;
  pitchDiameter: number;
  outsideDiameter: number;
  pitch: number;
}
