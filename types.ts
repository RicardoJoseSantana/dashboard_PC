export interface LockLevel {
  id: number;
  name: string;
  level: number; // 0-100 percentage
  status: 'normal' | 'filling' | 'draining' | 'critical';
}

export interface SystemStatus {
  state: 'IDLE' | 'TRANSIT' | 'EMERGENCY' | 'MAINTENANCE';
  boatPosition: number; // 0-4 (0=Outside, 1=Lock 1, etc.)
  pumpActive: boolean;
  lastUpdated: string;
}

export interface HistoricalData {
  timestamp: string;
  lock1: number;
  lock2: number;
  lock3: number;
  lock4: number;
}

export enum ControlCommand {
  START_TRANSIT = 'START_TRANSIT',
  STOP_EMERGENCY = 'STOP_EMERGENCY',
  RESET_CYCLE = 'RESET_CYCLE',
  TOGGLE_PUMP = 'TOGGLE_PUMP',
}