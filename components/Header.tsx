
import React from 'react';

interface HeaderProps {
  activeView?: 'operation' | 'history';
  onViewChange?: (view: 'operation' | 'history') => void;
}

const Header: React.FC<HeaderProps> = ({ activeView = 'operation', onViewChange }) => {
  return (
    <header className="sticky top-0 z-50 bg-scada-bg/95 backdrop-blur-md border-b border-scada-border shadow-2xl transition-all duration-300">
      <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo & Title Section */}
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-scada-accent rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.3)] shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6a6 6 0 0 1 8 0" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3a11 11 0 0 1 14 0" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22C9.24 22 7 19.76 7 17C7 13.5 12 9 12 9S17 13.5 17 17C17 19.76 14.76 22 12 22Z" />
            </svg>
            </div>
            <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white uppercase font-mono leading-none">
                Control de <span className="text-scada-accent">Esclusas</span>
            </h1>
            <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Sistema SCADA v2.4</span>
            </div>
        </div>

        {/* Navigation Tabs (Only if props are provided) */}
        {onViewChange && (
            <div className="flex bg-slate-900/50 p-1 rounded-lg border border-scada-border/50">
                <button
                    onClick={() => onViewChange('operation')}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold font-mono uppercase tracking-wider transition-all duration-200 flex items-center gap-2
                    ${activeView === 'operation' 
                        ? 'bg-scada-accent text-white shadow-md' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
                    <span className="hidden sm:inline">Panel Operativo</span>
                </button>
                <button
                    onClick={() => onViewChange('history')}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold font-mono uppercase tracking-wider transition-all duration-200 flex items-center gap-2
                    ${activeView === 'history' 
                        ? 'bg-scada-accent text-white shadow-md' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    <span className="hidden sm:inline">Histórico</span>
                </button>
            </div>
        )}

        {/* System Time & Status */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-mono text-slate-400 bg-scada-panel px-4 py-2 rounded border border-scada-border">
            <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>EN LÍNEA</span>
            </div>
            <div className="border-l border-scada-border pl-6">
            <span>{new Date().toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
