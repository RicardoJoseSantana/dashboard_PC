import { ControlCommand, HistoricalData, LockLevel, SystemStatus } from '../types';

// State simulation
let currentLevels = [20, 45, 60, 10]; // Initial levels
let pumpActive = false;
let systemState: SystemStatus['state'] = 'IDLE';
let boatPosition = 0;
let history: HistoricalData[] = [];

// Generate initial history
const now = new Date();
for (let i = 100; i > 0; i--) {
  history.push({
    timestamp: new Date(now.getTime() - i * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    lock1: 20 + Math.random() * 5,
    lock2: 45 + Math.random() * 5,
    lock3: 60 + Math.random() * 5,
    lock4: 10 + Math.random() * 5,
  });
}

// Simulation loop to make data dynamic
setInterval(() => {
  // Simulate pump effect
  if (pumpActive) {
    currentLevels = currentLevels.map(l => Math.min(100, l + Math.random() * 2));
  } else if (systemState === 'TRANSIT') {
    // In transit, levels equalize logic simulation
    currentLevels = currentLevels.map(l => Math.max(0, l - Math.random() * 1));
  } else {
    // Natural fluctuation
    currentLevels = currentLevels.map(l => {
        const change = (Math.random() - 0.5) * 0.5;
        return Math.max(0, Math.min(100, l + change));
    });
  }

  // Update history periodically
  if (Math.random() > 0.8) {
     const newPoint: HistoricalData = {
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        lock1: currentLevels[0],
        lock2: currentLevels[1],
        lock3: currentLevels[2],
        lock4: currentLevels[3],
     };
     history = [...history.slice(1), newPoint];
  }
}, 500);

export const fetchSystemStatus = async (): Promise<SystemStatus> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        state: systemState,
        boatPosition: boatPosition,
        pumpActive: pumpActive,
        lastUpdated: new Date().toISOString()
      });
    }, 100);
  });
};

export const fetchLevels = async (): Promise<LockLevel[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Esclusa 1 (Entrada)', level: currentLevels[0], status: getStatus(currentLevels[0]) },
        { id: 2, name: 'Esclusa 2', level: currentLevels[1], status: getStatus(currentLevels[1]) },
        { id: 3, name: 'Esclusa 3', level: currentLevels[2], status: getStatus(currentLevels[2]) },
        { id: 4, name: 'Esclusa 4 (Salida)', level: currentLevels[3], status: getStatus(currentLevels[3]) },
      ]);
    }, 100);
  });
};

export const fetchHistory = async (): Promise<HistoricalData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(history), 200);
  });
};

export const sendCommand = async (command: ControlCommand): Promise<{ success: boolean; message: string }> => {
  console.log(`[API] Command Received: ${command}`);
  
  // Update simulation state based on command
  switch (command) {
    case ControlCommand.TOGGLE_PUMP:
      pumpActive = !pumpActive;
      break;
    case ControlCommand.START_TRANSIT:
      systemState = 'TRANSIT';
      boatPosition = 1;
      setTimeout(() => { boatPosition = 2 }, 5000);
      setTimeout(() => { boatPosition = 3 }, 10000);
      setTimeout(() => { boatPosition = 4 }, 15000);
      setTimeout(() => { systemState = 'IDLE'; boatPosition = 0; }, 20000);
      break;
    case ControlCommand.STOP_EMERGENCY:
      systemState = 'EMERGENCY';
      pumpActive = false;
      break;
    case ControlCommand.RESET_CYCLE:
      systemState = 'IDLE';
      boatPosition = 0;
      pumpActive = false;
      currentLevels = [20, 20, 20, 20];
      break;
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: `Command ${command} executed` });
    }, 300);
  });
};

const getStatus = (level: number): LockLevel['status'] => {
  if (level > 90) return 'critical';
  if (pumpActive) return 'filling';
  if (level < 10) return 'draining';
  return 'normal';
};