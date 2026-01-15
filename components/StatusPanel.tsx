
import React from 'react';
import Card from './Card.tsx';
import { SystemStatus } from '../types.ts';

interface StatusPanelProps {
  status: SystemStatus | null;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ status }) => {
  if (!status) return <div className="scada-card" style={{ height: '12rem', opacity: 0.5 }}></div>;

  const stateClass = 
    status.state === 'EMERGENCY' ? 'text-danger' : 
    status.state === 'TRANSIT' ? 'text-accent' : 
    'text-success';

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
        icon={<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
    >
      <div className="grid-2 h-full">
        {/* State Display */}
        <div className="status-box" style={{ gridColumn: 'span 2' }}>
          <span className="text-xs text-muted uppercase tracking-wider mb-1">Estado Operativo</span>
          <span className={`text-2xl font-bold font-mono tracking-wider ${stateClass}`}>
            {getStateText(status.state)}
          </span>
          <div className="text-xs text-muted mt-2 font-mono">Última Actualización: {new Date(status.lastUpdated).toLocaleTimeString('es-ES')}</div>
        </div>

        {/* Boat Position */}
        <div className="status-box">
            <span className="text-xs text-muted uppercase tracking-wider mb-2">Posición del Barco</span>
            <div className="flex items-center gap-2">
                <span className="text-3xl font-bold font-mono text-white">
                    {status.boatPosition === 0 ? '--' : `ESCLUSA ${status.boatPosition}`}
                </span>
            </div>
            <div className="w-full mt-2 rounded-full overflow-hidden" style={{height:'8px', background:'#334155'}}>
                <div 
                    style={{ 
                        width: `${(status.boatPosition / 4) * 100}%`,
                        height: '100%',
                        background: 'var(--scada-accent)',
                        transition: 'width 0.5s ease-out'
                    }}
                ></div>
            </div>
        </div>

        {/* Pump Status */}
        <div className="status-box">
             <span className="text-xs text-muted uppercase tracking-wider mb-2">Estado de Bomba</span>
             <div style={{
                 width:'48px', height:'48px', borderRadius:'50%', border:'4px solid',
                 display:'flex', alignItems:'center', justifyContent:'center',
                 borderColor: status.pumpActive ? 'var(--scada-success)' : '#334155',
                 boxShadow: status.pumpActive ? '0 0 15px rgba(34,197,94,0.3)' : 'none',
                 transition: 'all 0.3s'
             }}>
                <svg className={status.pumpActive ? 'animate-spin text-success' : 'text-muted'} width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
             </div>
             <span className={`mt-2 text-xs font-bold ${status.pumpActive ? 'text-success' : 'text-muted'}`}>
                 {status.pumpActive ? 'ACTIVO' : 'INACTIVO'}
             </span>
        </div>
      </div>
    </Card>
  );
};

export default StatusPanel;