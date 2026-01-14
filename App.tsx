
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
  const [activeView, setActiveView] = useState<'operation' | 'history'>('operation');

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
    }, 2000); // 2 seconds poll
    return () => clearInterval(interval);
  }, [refreshData]);

  // Polling for history occasionally
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
    <div className="min-h-screen bg-scada-bg text-scada-text font-sans">
      
      {/* Sticky Header with Navigation */}
      <Header activeView={activeView} onViewChange={setActiveView} />
      
      <main className="max-w-[1920px] mx-auto p-4 md:p-6 lg:p-8 transition-all duration-500">
        
        {/* VIEW: OPERATION */}
        {activeView === 'operation' && (
            <div className="flex flex-col gap-6" style={{ animation: 'fadeIn 0.6s ease-out forwards' }}>
                
                {/* ROW 1: Visualizer (3/4) & Hydraulics (1/4) */}
                <div className="flex flex-col xl:flex-row gap-6 items-stretch">
                    
                    {/* 3/4 Column: Visualizer */}
                    <div className="xl:w-3/4 flex flex-col">
                        <LockVisualizer 
                            levels={lockLevels} 
                            valves={systemStatus?.valves}
                        />
                    </div>

                    {/* 1/4 Column: Hydraulic Control */}
                    <div className="xl:w-1/4 flex flex-col">
                        <HydraulicPanel 
                            pumpActive={systemStatus?.pumpActive || false}
                            valves={systemStatus?.valves || [false, false, false]}
                            onActionTriggered={refreshData}
                        />
                    </div>
                </div>

                {/* ROW 2: Status (1/2) & Operations (1/2) */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6" style={{ animation: 'fadeIn 0.6s ease-out 0.2s forwards', opacity: 0 }}>
                    
                    {/* 1/2 Column: Status */}
                    <div className="w-full">
                        <StatusPanel status={systemStatus} />
                    </div>

                    {/* 1/2 Column: Operations */}
                    <div className="w-full">
                        <ControlPanel 
                            pumpState={systemStatus?.pumpActive || false} 
                            onActionTriggered={refreshData} 
                        />
                    </div>
                </div>

            </div>
        )}

        {/* VIEW: HISTORY */}
        {activeView === 'history' && (
            <div className="flex flex-col gap-6" style={{ animation: 'fadeIn 0.5s ease-out' }}>
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-200">Análisis Histórico</h2>
                    <button onClick={refreshHistory} className="text-sm text-scada-accent hover:text-white transition-colors flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        Actualizar Datos
                    </button>
                </div>
                {/* History Chart takes full width/height in this view */}
                <div className="h-[60vh]">
                    <HistoryChart data={historyData} />
                </div>
                
                {/* Summary Stats Placeholder */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                     <div className="bg-scada-panel border border-scada-border p-4 rounded text-center">
                        <div className="text-xs text-slate-500 uppercase">Promedio Nivel E1</div>
                        <div className="text-xl font-mono text-scada-accent mt-1">
                            {(historyData.reduce((acc, curr) => acc + curr.lock1, 0) / (historyData.length || 1)).toFixed(1)}%
                        </div>
                     </div>
                     <div className="bg-scada-panel border border-scada-border p-4 rounded text-center">
                        <div className="text-xs text-slate-500 uppercase">Promedio Nivel E2</div>
                        <div className="text-xl font-mono text-scada-success mt-1">
                            {(historyData.reduce((acc, curr) => acc + curr.lock2, 0) / (historyData.length || 1)).toFixed(1)}%
                        </div>
                     </div>
                     <div className="bg-scada-panel border border-scada-border p-4 rounded text-center">
                        <div className="text-xs text-slate-500 uppercase">Promedio Nivel E3</div>
                        <div className="text-xl font-mono text-scada-warning mt-1">
                             {(historyData.reduce((acc, curr) => acc + curr.lock3, 0) / (historyData.length || 1)).toFixed(1)}%
                        </div>
                     </div>
                     <div className="bg-scada-panel border border-scada-border p-4 rounded text-center">
                        <div className="text-xs text-slate-500 uppercase">Promedio Nivel E4</div>
                        <div className="text-xl font-mono text-fuchsia-500 mt-1">
                             {(historyData.reduce((acc, curr) => acc + curr.lock4, 0) / (historyData.length || 1)).toFixed(1)}%
                        </div>
                     </div>
                </div>
            </div>
        )}

      </main>
      
      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
