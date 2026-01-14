import { ControlCommand, HistoricalData, LockLevel, SystemStatus } from '../types';

// State simulation
let currentLevels = [20, 45, 60, 10]; // Initial levels
let pumpActive = false;
let valveStates = [false, false, false]; // [Valve 1-2, Valve 2-3, Valve 3-4]
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
  // SAFETY INTERLOCK: Check for critical levels (>= 90%)
  const isCritical = currentLevels.some(level => level >= 90);

  // If pump is running and we hit critical levels, EMERGENCY CUTOFF
  if (pumpActive && isCritical) {
    console.log("[SISTEMA] Parada automática de bomba: Nivel crítico detectado.");
    pumpActive = false;
  }

  // --- PHYSICS: Communicating Vessels (Equalization) ---
  // Flow moves from HIGH to LOW level.
  const transferRate = 1.0; 

  // Valve 1-2 (Index 0 connects Lock 1 [idx 0] and Lock 2 [idx 1])
  if (valveStates[0]) {
    const diff = currentLevels[0] - currentLevels[1];
    // Only flow if difference is significant
    if (Math.abs(diff) > 0.5) {
        // Calculate amount to move (don't move more than half the diff to avoid ping-pong effect)
        const flow = Math.min(Math.abs(diff) / 2, transferRate);
        
        if (diff > 0) {
            // Lock 1 is higher: Lock 1 loses, Lock 2 gains
            currentLevels[0] -= flow;
            currentLevels[1] += flow;
        } else {
            // Lock 2 is higher: Lock 2 loses, Lock 1 gains
            currentLevels[0] += flow;
            currentLevels[1] -= flow;
        }
    }
  }

  // Valve 2-3 (Index 1 connects Lock 2 [idx 1] and Lock 3 [idx 2])
  if (valveStates[1]) {
    const diff = currentLevels[1] - currentLevels[2];
    if (Math.abs(diff) > 0.5) {
        const flow = Math.min(Math.abs(diff) / 2, transferRate);
        if (diff > 0) {
            currentLevels[1] -= flow;
            currentLevels[2] += flow;
        } else {
            currentLevels[1] += flow;
            currentLevels[2] -= flow;
        }
    }
  }

  // Valve 3-4 (Index 2 connects Lock 3 [idx 2] and Lock 4 [idx 3])
  if (valveStates[2]) {
    const diff = currentLevels[2] - currentLevels[3];
    if (Math.abs(diff) > 0.5) {
        const flow = Math.min(Math.abs(diff) / 2, transferRate);
        if (diff > 0) {
            currentLevels[2] -= flow;
            currentLevels[3] += flow;
        } else {
            currentLevels[2] += flow;
            currentLevels[3] -= flow;
        }
    }
  }

  // --- Pump Effect ---
  if (pumpActive) {
    // Only fill if NOT critical 
    if (!isCritical) {
        // Pump logic: Fills slightly for visual effect
        currentLevels = currentLevels.map(l => Math.min(100, l + Math.random() * 2));
    }
  } else if (systemState === 'TRANSIT') {
    // In transit, levels equalize logic simulation (automated)
    currentLevels = currentLevels.map(l => Math.max(0, l - Math.random() * 1));
  } else {
    // Natural fluctuation (only if nothing else is happening)
    const isAnyValveOpen = valveStates.some(v => v);
    if (!isAnyValveOpen) {
        currentLevels = currentLevels.map(l => {
            const change = (Math.random() - 0.5) * 0.5;
            return Math.max(0, Math.min(100, l + change));
        });
    }
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
        valves: [valveStates[0], valveStates[1], valveStates[2]],
        lastUpdated: new Date().toISOString()
      });
    }, 100);
  });
};

export const fetchLevels = async (): Promise<LockLevel[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Esclusa 1', level: currentLevels[0], status: getStatus(currentLevels[0]) },
        { id: 2, name: 'Esclusa 2', level: currentLevels[1], status: getStatus(currentLevels[1]) },
        { id: 3, name: 'Esclusa 3', level: currentLevels[2], status: getStatus(currentLevels[2]) },
        { id: 4, name: 'Esclusa 4', level: currentLevels[3], status: getStatus(currentLevels[3]) },
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
      const hasCriticalLevels = currentLevels.some(l => l >= 90);
      if (pumpActive) {
        pumpActive = false;
      } else {
        if (hasCriticalLevels) {
          console.warn("[SISTEMA] No se puede iniciar bomba: Niveles críticos presentes.");
          return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: false, message: `No se puede iniciar: Nivel Crítico` });
            }, 300);
          });
        } else {
          pumpActive = true;
        }
      }
      break;
    case ControlCommand.TOGGLE_VALVE_1_2:
        valveStates[0] = !valveStates[0];
        break;
    case ControlCommand.TOGGLE_VALVE_2_3:
        valveStates[1] = !valveStates[1];
        break;
    case ControlCommand.TOGGLE_VALVE_3_4:
        valveStates[2] = !valveStates[2];
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
      valveStates = [false, false, false]; // Close valves on emergency
      break;
    case ControlCommand.RESET_CYCLE:
      systemState = 'IDLE';
      boatPosition = 0;
      pumpActive = false;
      valveStates = [false, false, false];
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
  if (level >= 90) return 'critical';
  if (pumpActive) return 'filling';
  if (level < 10) return 'draining';
  return 'normal';
};