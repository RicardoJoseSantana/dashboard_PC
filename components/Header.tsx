import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4 py-2 border-b border-scada-border">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-scada-accent rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.3)]">
           <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
           </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white uppercase font-mono">
            Lock Control <span className="text-scada-accent">Dashboard</span>
          </h1>
          <p className="text-xs text-slate-400 font-mono tracking-widest">INDUSTRIAL AUTOMATION HMI // V1.0.4</p>
        </div>
      </div>
      <div className="flex items-center gap-6 text-sm font-mono text-slate-400 bg-scada-panel px-4 py-2 rounded border border-scada-border">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span>SYSTEM ONLINE</span>
        </div>
        <div className="border-l border-scada-border pl-6">
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;