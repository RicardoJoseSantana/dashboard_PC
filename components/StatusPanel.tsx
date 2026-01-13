import React from 'react';
import Card from './Card';
import { SystemStatus } from '../types';

interface StatusPanelProps {
  status: SystemStatus | null;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ status }) => {
  if (!status) return <div className="animate-pulse bg-scada-panel h-48 rounded"></div>;

  const stateColor = 
    status.state === 'EMERGENCY' ? 'text-scada-danger' : 
    status.state === 'TRANSIT' ? 'text-scada-accent' : 
    'text-scada-success';

  const getStateText = (state: string) => {
    switch(state) {
      case 'IDLE': return 'INACTIVO';
      case 'TRANSIT': return 'TRÁNSITO';
      case 'EMERGENCY': return 'EMERGENCIA';
      case 'MAINTENANCE': return 'MANTENIMIENTO';
      default: return state;
    }
  };

  return (
    <Card 
        title="Estado del Sistema" 
        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
    >
      <div className="grid grid-cols-2 gap-4 h-full">
        {/* State Display */}
        <div className="col-span-2 flex flex-col items-center justify-center p-4 bg-slate-950/50 rounded border border-scada-border/50">
          <span className="text-xs text-slate-500 uppercase tracking-widest mb-1">Estado Operativo</span>
          <span className={`text-2xl font-bold font-mono tracking-wider ${stateColor}`}>
            {getStateText(status.state)}
          </span>
          <div className="text-xs text-slate-400 mt-2 font-mono">Última Actualización: {new Date(status.lastUpdated).toLocaleTimeString('es-ES')}</div>
        </div>

        {/* Boat Position */}
        <div className="col-span-2 md:col-span-1 p-4 bg-slate-950/50 rounded border border-scada-border/50 flex flex-col justify-center">
            <span className="text-xs text-slate-500 uppercase tracking-widest mb-2">Posición del Barco</span>
            <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-white font-mono">
                    {status.boatPosition === 0 ? '--' : `ESCLUSA ${status.boatPosition}`}
                </span>
            </div>
            <div className="w-full bg-slate-800 h-2 mt-2 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-scada-accent transition-all duration-500 ease-out"
                    style={{ width: `${(status.boatPosition / 4) * 100}%` }}
                ></div>
            </div>
        </div>

        {/* Pump Status */}
        <div className="col-span-2 md:col-span-1 p-4 bg-slate-950/50 rounded border border-scada-border/50 flex flex-col justify-center items-center">
             <span className="text-xs text-slate-500 uppercase tracking-widest mb-2">Estado de Bomba</span>
             <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-colors duration-300 ${status.pumpActive ? 'border-scada-success shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'border-slate-700'}`}>
                <svg className={`w-6 h-6 ${status.pumpActive ? 'text-scada-success animate-spin' : 'text-slate-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
             </div>
             <span className={`mt-2 text-xs font-bold ${status.pumpActive ? 'text-scada-success' : 'text-slate-500'}`}>
                 {status.pumpActive ? 'ACTIVO' : 'INACTIVO'}
             </span>
        </div>
      </div>
    </Card>
  );
};

export default StatusPanel;