interface ChartData {
  sprocket_production_actual: Number[];
  sprocket_production_goal: Number[];
  time: Number[];
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
