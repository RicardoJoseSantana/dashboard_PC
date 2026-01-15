
import React, { useEffect, useState, useCallback } from 'react';
import Header from './components/Header.tsx';
import StatusPanel from './components/StatusPanel.tsx';
import LockVisualizer from './components/LockVisualizer.tsx';
import ControlPanel from './components/ControlPanel.tsx';
import HydraulicPanel from './components/HydraulicPanel.tsx';
import HistoryChart from './components/HistoryChart.tsx';
import { fetchLevels, fetchSystemStatus, fetchHistory } from './services/mockApi.ts';
import { SystemStatus, LockLevel, HistoricalData } from './types.ts';

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
      <div className="container-fluid justify-center items-center">
        <div className="text-xl font-mono animate-pulse text-accent">INICIANDO SISTEMA...</div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      
      {/* Sticky Header with Navigation */}
      <Header activeView={activeView} onViewChange={setActiveView} />
      
      <main className="container">
        
        {/* VIEW: OPERATION */}
        {activeView === 'operation' && (
            <div className="grid-layout" style={{ animation: 'fadeIn 0.6s ease-out forwards' }}>
                
                {/* ROW 1: Visualizer (3/4) & Hydraulics (1/4) */}
                <div className="row">
                    
                    {/* 3/4 Column: Visualizer */}
                    <div className="col-3-4 flex-col">
                        <LockVisualizer 
                            levels={lockLevels} 
                            valves={systemStatus?.valves}
                        />
                    </div>

                    {/* 1/4 Column: Hydraulic Control */}
                    <div className="col-1-4 flex-col">
                        <HydraulicPanel 
                            pumpActive={systemStatus?.pumpActive || false}
                            valves={systemStatus?.valves || [false, false, false]}
                            onActionTriggered={refreshData}
                        />
                    </div>
                </div>

                {/* ROW 2: Status (1/2) & Operations (1/2) */}
                <div className="row" style={{ animation: 'fadeIn 0.6s ease-out 0.2s forwards', opacity: 0 }}>
                    
                    {/* 1/2 Column: Status */}
                    <div className="col-1-2">
                        <StatusPanel status={systemStatus} />
                    </div>

                    {/* 1/2 Column: Operations */}
                    <div className="col-1-2">
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
            <div className="grid-layout" style={{ animation: 'fadeIn 0.5s ease-out' }}>
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Análisis Histórico</h2>
                    <button onClick={refreshHistory} className="text-sm text-accent hover:text-white flex items-center gap-2" style={{background:'none', border:'none', cursor:'pointer'}}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        Actualizar Datos
                    </button>
                </div>
                {/* History Chart takes full width/height in this view */}
                <div style={{ height: '60vh' }}>
                    <HistoryChart data={historyData} />
                </div>
                
                {/* Summary Stats Placeholder */}
                <div className="row">
                     <div className="col-1-4 status-box">
                        <div className="text-xs text-muted uppercase">Promedio Nivel E1</div>
                        <div className="text-xl font-mono text-accent mt-1">
                            {(historyData.reduce((acc, curr) => acc + curr.lock1, 0) / (historyData.length || 1)).toFixed(1)}%
                        </div>
                     </div>
                     <div className="col-1-4 status-box">
                        <div className="text-xs text-muted uppercase">Promedio Nivel E2</div>
                        <div className="text-xl font-mono text-success mt-1">
                            {(historyData.reduce((acc, curr) => acc + curr.lock2, 0) / (historyData.length || 1)).toFixed(1)}%
                        </div>
                     </div>
                     <div className="col-1-4 status-box">
                        <div className="text-xs text-muted uppercase">Promedio Nivel E3</div>
                        <div className="text-xl font-mono text-warning mt-1">
                             {(historyData.reduce((acc, curr) => acc + curr.lock3, 0) / (historyData.length || 1)).toFixed(1)}%
                        </div>
                     </div>
                     <div className="col-1-4 status-box">
                        <div className="text-xs text-muted uppercase">Promedio Nivel E4</div>
                        <div className="text-xl font-mono mt-1" style={{ color: '#d946ef' }}>
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