
import React from 'react';

interface HeaderProps {
  activeView?: 'operation' | 'history';
  onViewChange?: (view: 'operation' | 'history') => void;
}

const Header: React.FC<HeaderProps> = ({ activeView = 'operation', onViewChange }) => {
  return (
    <header className="app-header">
        
        {/* Logo & Title Section */}
        <div className="logo-section">
            <div className="logo-icon">
            <svg width="24" height="24" className="text-white" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6a6 6 0 0 1 8 0" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3a11 11 0 0 1 14 0" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22C9.24 22 7 19.76 7 17C7 13.5 12 9 12 9S17 13.5 17 17C17 19.76 14.76 22 12 22Z" />
            </svg>
            </div>
            <div className="app-title">
            <h1>
                Control de <span style={{color:'var(--scada-accent)', display:'inline'}}>Esclusas</span>
            </h1>
            <span>Sistema SCADA v2.4</span>
            </div>
        </div>

        {/* Navigation Tabs */}
        {onViewChange && (
            <div className="nav-group">
                <button
                    onClick={() => onViewChange('operation')}
                    className={`nav-btn ${activeView === 'operation' ? 'active' : ''}`}
                >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
                    <span className="hidden sm:inline">Panel Operativo</span>
                </button>
                <button
                    onClick={() => onViewChange('history')}
                    className={`nav-btn ${activeView === 'history' ? 'active' : ''}`}
                >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    <span className="hidden sm:inline">Histórico</span>
                </button>
            </div>
        )}

        {/* System Time & Status */}
        <div className="hidden" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontFamily: 'monospace', fontSize: '0.875rem', color: '#94a3b8', background: '#1e293b', padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #334155' }}>
            <div style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
            <span style={{width:'8px', height:'8px', background:'#22c55e', borderRadius:'50%', display:'block'}} className="animate-pulse"></span>
            <span>EN LÍNEA</span>
            </div>
            <div style={{borderLeft:'1px solid #334155', paddingLeft:'1.5rem'}}>
            <span>{new Date().toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
        </div>
    </header>
  );
};

export default Header;