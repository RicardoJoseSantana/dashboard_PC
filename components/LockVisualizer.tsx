
import React from 'react';
import Card from './Card';
import { LockLevel } from '../types';

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
        className="h-full min-h-[400px]"
        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
    >
      <div className="h-full w-full flex items-end justify-center gap-1 py-4 px-2 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
        {levels.length === 0 && <p className="text-slate-500">Esperando telemetría...</p>}
        
        {levels.map((lock, index) => (
          <React.Fragment key={lock.id}>
            {/* TANK */}
            <div className="flex flex-col items-center gap-3 w-1/5 group">
                {/* Value Indicator */}
                <div className="font-mono text-xl font-bold text-white relative">
                    {lock.level.toFixed(1)}<span className="text-xs text-slate-500 ml-1">%</span>
                    <div className={`absolute -right-3 top-1 w-1.5 h-1.5 rounded-full ${lock.level > 90 ? 'bg-red-500 animate-pulse' : 'bg-transparent'}`}></div>
                </div>

                {/* Tank Visual */}
                <div className="relative w-full h-48 bg-slate-900 border-x border-b border-slate-600 rounded-b-lg overflow-hidden shadow-inner ring-1 ring-white/5 z-10">
                    {/* Measurement Lines */}
                    <div className="absolute inset-0 z-10 flex flex-col justify-between py-2 pointer-events-none opacity-30">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-full border-t border-dashed border-slate-500 h-0"></div>
                        ))}
                    </div>

                    {/* Water Level */}
                    <div 
                        className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-in-out bg-opacity-80 backdrop-blur-sm
                            ${lock.status === 'critical' ? 'bg-red-600' : 'bg-scada-accent'}
                        `}
                        style={{ height: `${lock.level}%` }}
                    >
                        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(0deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:10px_10px] opacity-20"></div>
                        <div className="absolute top-0 w-full h-[1px] bg-white opacity-50 shadow-[0_0_10px_white]"></div>
                    </div>
                </div>

                {/* Label */}
                <div className="text-center">
                    <div className="text-xs font-bold text-slate-300 uppercase tracking-wide">{lock.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 font-mono uppercase">{getStatusText(lock.status)}</div>
                </div>
            </div>

            {/* VALVE CONNECTOR (Render if not the last item) */}
            {index < levels.length - 1 && (
                <div className="h-48 flex flex-col justify-end items-center pb-14 -mx-2 z-0 relative">
                     {/* The Pipe */}
                     <div className={`h-4 w-12 border-y-2 transition-colors duration-300
                        ${valves[index] ? 'bg-scada-accent/30 border-scada-accent animate-pulse' : 'bg-slate-800 border-slate-600'}
                     `}></div>
                     
                     {/* The Valve Handle Icon */}
                     <div className={`absolute bottom-[3.5rem] w-6 h-6 rounded-full border-2 flex items-center justify-center bg-slate-900 transition-colors duration-300
                         ${valves[index] ? 'border-scada-success shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'border-slate-500'}
                     `}>
                        <div className={`w-0.5 h-3 bg-current transition-transform duration-300 ${valves[index] ? 'rotate-90 bg-scada-success' : 'bg-slate-500'}`}></div>
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
