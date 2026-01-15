
import React from 'react';
import Card from './Card';
import { ControlCommand } from '../types';
import { sendCommand } from '../services/mockApi';

interface ControlPanelProps {
  pumpState: boolean; 
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
        icon={<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>}
    >
      <div className="flex-col gap-4">
        
        <div className="grid-layout gap-4 mt-2">
            <button 
                onClick={() => handleCommand(ControlCommand.START_TRANSIT)}
                className="btn btn-success"
            >
                <svg width="20" height="20" style={{marginRight:'8px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                INICIAR SECUENCIA TRÁNSITO
            </button>

            <button 
                onClick={() => handleCommand(ControlCommand.RESET_CYCLE)}
                className="btn btn-primary"
            >
                <svg width="20" height="20" style={{marginRight:'8px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                REINICIAR CICLO
            </button>

            <div style={{height:'1px', background:'#334155', margin:'8px 0'}}></div>

            <button 
                onClick={() => handleCommand(ControlCommand.STOP_EMERGENCY)}
                className="btn btn-danger"
            >
                <svg width="20" height="20" style={{marginRight:'8px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                PARADA DE EMERGENCIA
            </button>
        </div>
      </div>
    </Card>
  );
};

export default ControlPanel;