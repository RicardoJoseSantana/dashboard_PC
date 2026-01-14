
import React from 'react';
import Card from './Card';
import { ControlCommand } from '../types';
import { sendCommand } from '../services/mockApi';

interface ControlPanelProps {
  pumpState: boolean; // Kept in interface just in case, but unused for slider now
  onActionTriggered: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onActionTriggered }) => {

  const handleCommand = async (command: ControlCommand) => {
    try {
      await sendCommand(command);
      onActionTriggered();
    } catch (err) {
      console.error("Error en comando", err);
    }
  };

  return (
    <Card 
        title="Control de Operaciones" 
        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>}
    >
      <div className="flex flex-col gap-4">
        
        <div className="grid grid-cols-1 gap-4 mt-2">
            <button 
                onClick={() => handleCommand(ControlCommand.START_TRANSIT)}
                className="group relative flex items-center justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-scada-success hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-scada-success shadow-lg shadow-green-900/20 active:translate-y-0.5 transition-all overflow-hidden"
            >
                <span className="absolute w-0 h-full bg-white opacity-10 group-hover:w-full transition-all duration-300 ease-out"></span>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                INICIAR SECUENCIA TRÁNSITO
            </button>

            <button 
                onClick={() => handleCommand(ControlCommand.RESET_CYCLE)}
                className="group flex items-center justify-center py-3 px-4 border border-blue-700/50 text-sm font-bold rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 active:translate-y-0.5 transition-all shadow-lg shadow-blue-900/20"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                REINICIAR CICLO
            </button>

            <div className="h-px bg-scada-border my-2"></div>

            <button 
                onClick={() => handleCommand(ControlCommand.STOP_EMERGENCY)}
                className="group flex items-center justify-center py-4 px-4 border border-red-900 text-sm font-bold rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse hover:animate-none active:translate-y-0.5 transition-all"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                PARADA DE EMERGENCIA
            </button>
        </div>
      </div>
    </Card>
  );
};

export default ControlPanel;
