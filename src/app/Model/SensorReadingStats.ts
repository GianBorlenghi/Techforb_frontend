interface SensorReadingStats {
    redCount: number;
    mediumCount: number;
    okCount: number;
  }
  
  interface Sensor {
    type: string;
    status: boolean;
    readingStats: SensorReadingStats;
  }
  
  interface SensorPlant {
    plant_name: string;
    sensors: Sensor[];  // array of Sensor objects
  }