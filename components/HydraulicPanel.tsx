
import React from 'react';
import Card from './Card';
import { ControlCommand } from '../types';
import { sendCommand } from '../services/mockApi';

interface HydraulicPanelProps {
  pumpActive: boolean;
  valves: [boolean, boolean, boolean];
  onActionTriggered: () => void;
}

const HydraulicPanel: React.FC<HydraulicPanelProps> = ({ pumpActive, valves, onActionTriggered }) => {

  const handleCommand = async (command: ControlCommand) => {
    try {
      await sendCommand(command);
      onActionTriggered();
    } catch (err) {
      console.error("Error en comando hidráulico", err);
    }
  };

  return (
    <Card 
        title="Control Hidráulico" 
        className="h-full"
        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
    >
      <div className="flex flex-col gap-5">
        
        {/* Main Pump */}
        <div className="flex items-center justify-between p-3 bg-slate-950/80 rounded border border-scada-border shadow-inner">
            <div className="flex flex-col">
                <span className="text-sm font-bold text-scada-accent uppercase">Bomba Principal</span>
                <span className="text-[10px] text-slate-500 font-mono">ALIMENTACIÓN CENTRAL</span>
            </div>
            <button 
                onClick={() => handleCommand(ControlCommand.TOGGLE_PUMP)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-scada-accent focus:ring-offset-1 focus:ring-offset-slate-900 ${pumpActive ? 'bg-scada-accent shadow-[0_0_10px_rgba(14,165,233,0.5)]' : 'bg-slate-700'}`}
            >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition transition-transform ${pumpActive ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>

        <div className="h-px bg-slate-700/50 mx-2"></div>

        {/* Valve Controls Section */}
        <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase mb-3 px-1">Válvulas de Interconexión</h4>
            <div className="flex flex-col gap-3">
                
                {/* Valve 1-2 */}
                <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded border border-slate-700 hover:border-slate-600 transition-colors">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-200">Válvula 1-2</span>
                        <span className="text-[10px] text-slate-500 font-mono">ENTRE ESCLUSA 1 Y 2</span>
                    </div>
                    <button 
                        onClick={() => handleCommand(ControlCommand.TOGGLE_VALVE_1_2)}
                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-scada-success focus:ring-offset-1 focus:ring-offset-slate-900 ${valves[0] ? 'bg-scada-success shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-slate-700'}`}
                    >
                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition transition-transform ${valves[0] ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>

                {/* Valve 2-3 */}
                <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded border border-slate-700 hover:border-slate-600 transition-colors">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-200">Válvula 2-3</span>
                        <span className="text-[10px] text-slate-500 font-mono">ENTRE ESCLUSA 2 Y 3</span>
                    </div>
                    <button 
                        onClick={() => handleCommand(ControlCommand.TOGGLE_VALVE_2_3)}
                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-scada-success focus:ring-offset-1 focus:ring-offset-slate-900 ${valves[1] ? 'bg-scada-success shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-slate-700'}`}
                    >
                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition transition-transform ${valves[1] ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>

                {/* Valve 3-4 */}
                <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded border border-slate-700 hover:border-slate-600 transition-colors">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-200">Válvula 3-4</span>
                        <span className="text-[10px] text-slate-500 font-mono">ENTRE ESCLUSA 3 Y 4</span>
                    </div>
                    <button 
                        onClick={() => handleCommand(ControlCommand.TOGGLE_VALVE_3_4)}
                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-scada-success focus:ring-offset-1 focus:ring-offset-slate-900 ${valves[2] ? 'bg-scada-success shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-slate-700'}`}
                    >
                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition transition-transform ${valves[2] ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>

            </div>
        </div>

      </div>
    </Card>
  );
};

export default HydraulicPanel;
