
import React from 'react';
import Card from './Card.tsx';
import { LockLevel } from '../types.ts';

interface LockVisualizerProps {
  levels: LockLevel[];
  valves?: [boolean, boolean, boolean];
}

const getStatusText = (status: string) => {
    switch(status) {
        case 'normal': return 'normal';
        case 'filling': return 'llenando';
        case 'draining': return 'drenando';
        case 'critical': return 'crítico';
        default: return status;
    }
};

const LockVisualizer: React.FC<LockVisualizerProps> = ({ levels, valves = [false, false, false] }) => {
  return (
    <Card 
        title="Visualización de Cámaras" 
        className="h-full"
        icon={<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
    >
      <div className="h-full w-full visualizer-bg p-4">
        {levels.length === 0 && <p className="text-muted">Esperando telemetría...</p>}
        
        {levels.map((lock, index) => (
          <React.Fragment key={lock.id}>
            {/* TANK */}
            <div className="tank-col">
                {/* Value Indicator */}
                <div className="font-mono text-xl font-bold text-white relative">
                    {lock.level.toFixed(1)}<span className="text-xs text-muted ml-1">%</span>
                    <div style={{
                        position: 'absolute', right: '-12px', top: '4px', width: '6px', height: '6px', borderRadius: '50%',
                        background: lock.level > 90 ? 'var(--scada-danger)' : 'transparent'
                    }} className={lock.level > 90 ? 'animate-pulse' : ''}></div>
                </div>

                {/* Tank Visual */}
                <div className="tank-body">
                    {/* Measurement Lines */}
                    <div className="h-full w-full absolute top-0 left-0 flex flex-col justify-between py-2 pointer-events-none opacity-30">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} style={{width:'100%', borderTop:'1px dashed #64748b', height:0}}></div>
                        ))}
                    </div>

                    {/* Water Level */}
                    <div 
                        className={`water-level ${lock.status === 'critical' ? 'critical' : ''}`}
                        style={{ height: `${lock.level}%` }}
                    >
                        <div style={{position:'absolute', top:0, width:'100%', height:'1px', background:'white', boxShadow:'0 0 10px white', opacity:0.5}}></div>
                    </div>
                </div>

                {/* Label */}
                <div className="text-center">
                    <div className="text-xs font-bold text-white uppercase tracking-wider">{lock.name}</div>
                    <div className="text-xs text-muted mt-1 font-mono uppercase">{getStatusText(lock.status)}</div>
                </div>
            </div>

            {/* VALVE CONNECTOR */}
            {index < levels.length - 1 && (
                <div className="pipe-connector">
                     {/* The Pipe */}
                     <div className={`pipe-line ${valves[index] ? 'active animate-pulse' : ''}`}></div>
                     
                     {/* The Valve Handle Icon */}
                     <div className={`valve-circle ${valves[index] ? 'active' : ''}`}>
                        <div className="valve-bar" style={{ transform: valves[index] ? 'rotate(90deg)' : 'rotate(0)' }}></div>
                     </div>
                </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
};

export default LockVisualizer;