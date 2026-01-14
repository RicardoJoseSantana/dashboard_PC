
import React, { useEffect, useState, useCallback } from 'react';
import Header from './components/Header';
import StatusPanel from './components/StatusPanel';
import LockVisualizer from './components/LockVisualizer';
import ControlPanel from './components/ControlPanel';
import HydraulicPanel from './components/HydraulicPanel';
import HistoryChart from './components/HistoryChart';
import { fetchLevels, fetchSystemStatus, fetchHistory } from './services/mockApi';
import { SystemStatus, LockLevel, HistoricalData } from './types';

export default function App() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [lockLevels, setLockLevels] = useState<LockLevel[]>([]);
  const [historyData, setHistoryData] = useState<HistoricalData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = useCallback(async () => {
    try {
      const [status, levels] = await Promise.all([
        fetchSystemStatus(),
        fetchLevels()
      ]);
      setSystemStatus(status);
      setLockLevels(levels);
    } catch (error) {
      console.error("Error al obtener datos en tiempo real", error);
    }
  }, []);

  const refreshHistory = useCallback(async () => {
    try {
      const history = await fetchHistory();
      setHistoryData(history);
    } catch (error) {
      console.error("Error al obtener historial", error);
    }
  }, []);

  // Initial Load
  useEffect(() => {
    const init = async () => {
      await Promise.all([refreshData(), refreshHistory()]);
      setIsLoading(false);
    };
    init();
  }, [refreshData, refreshHistory]);

  // Polling for real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 2000); // 2 seconds poll as requested
    return () => clearInterval(interval);
  }, [refreshData]);

  // Polling for history occasionally (e.g., every 10s) to update chart
  useEffect(() => {
    const interval = setInterval(() => {
      refreshHistory();
    }, 10000);
    return () => clearInterval(interval);
  }, [refreshHistory]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-scada-bg text-scada-accent">
        <div className="text-xl font-mono animate-pulse">INICIANDO SISTEMA...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-scada-bg text-scada-text font-sans p-4 md:p-6 lg:p-8 flex flex-col gap-6">
      <Header />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visualization and History */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <LockVisualizer 
            levels={lockLevels} 
            valves={systemStatus?.valves}
          />
          <HistoryChart data={historyData} />
        </div>

        {/* Right Column: Status & Operations */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <StatusPanel status={systemStatus} />
          
          <ControlPanel 
            pumpState={systemStatus?.pumpActive || false} 
            onActionTriggered={refreshData} 
          />
          
          <HydraulicPanel 
              pumpActive={systemStatus?.pumpActive || false}
              valves={systemStatus?.valves || [false, false, false]}
              onActionTriggered={refreshData}
           />
        </div>
      </div>
    </div>
  );
}
