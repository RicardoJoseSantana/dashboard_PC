import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4 py-2 border-b border-scada-border">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-scada-accent rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.3)]">
           <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             {/* Wifi Waves */}
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6a6 6 0 0 1 8 0" />
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3a11 11 0 0 1 14 0" />
             {/* Water Drop */}
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22C9.24 22 7 19.76 7 17C7 13.5 12 9 12 9S17 13.5 17 17C17 19.76 14.76 22 12 22Z" />
           </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white uppercase font-mono">
            Control de <span className="text-scada-accent">Esclusas</span>
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-6 text-sm font-mono text-slate-400 bg-scada-panel px-4 py-2 rounded border border-scada-border">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span>SISTEMA EN LÍNEA</span>
        </div>
        <div className="border-l border-scada-border pl-6">
          <span>{new Date().toLocaleDateString('es-ES')}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;