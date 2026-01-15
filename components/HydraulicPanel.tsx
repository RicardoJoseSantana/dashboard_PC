
import React from 'react';
import Card from './Card.tsx';
import { ControlCommand } from '../types.ts';
import { sendCommand } from '../services/mockApi.ts';

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
        icon={<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
    >
      <div className="flex-col gap-6">
        
        {/* Main Pump */}
        <div className="control-row">
            <div className="flex-col">
                <span className="text-sm font-bold text-accent uppercase">Bomba Principal</span>
                <span className="text-xs text-muted font-mono">ALIMENTACIÓN CENTRAL</span>
            </div>
            <button 
                onClick={() => handleCommand(ControlCommand.TOGGLE_PUMP)}
                className={`switch ${pumpActive ? 'active' : ''}`}
            >
                <span className="switch-knob" />
            </button>
        </div>

        <div style={{height:'1px', background:'rgba(51, 65, 85, 0.5)', margin:'0 8px'}}></div>

        {/* Valve Controls Section */}
        <div>
            <h4 className="text-xs font-mono text-muted uppercase mb-3 px-1">Válvulas de Interconexión</h4>
            <div className="flex-col gap-4">
                
                {/* Valve 1-2 */}
                <div className="control-row">
                    <div className="flex-col">
                        <span className="text-sm font-bold text-white">Válvula 1-2</span>
                        <span className="text-xs text-muted font-mono">ENTRE ESCLUSA 1 Y 2</span>
                    </div>
                    <button 
                        onClick={() => handleCommand(ControlCommand.TOGGLE_VALVE_1_2)}
                        className={`switch ${valves[0] ? 'active-green' : ''}`}
                    >
                        <span className="switch-knob" />
                    </button>
                </div>

                {/* Valve 2-3 */}
                <div className="control-row">
                    <div className="flex-col">
                        <span className="text-sm font-bold text-white">Válvula 2-3</span>
                        <span className="text-xs text-muted font-mono">ENTRE ESCLUSA 2 Y 3</span>
                    </div>
                    <button 
                        onClick={() => handleCommand(ControlCommand.TOGGLE_VALVE_2_3)}
                        className={`switch ${valves[1] ? 'active-green' : ''}`}
                    >
                        <span className="switch-knob" />
                    </button>
                </div>

                {/* Valve 3-4 */}
                <div className="control-row">
                    <div className="flex-col">
                        <span className="text-sm font-bold text-white">Válvula 3-4</span>
                        <span className="text-xs text-muted font-mono">ENTRE ESCLUSA 3 Y 4</span>
                    </div>
                    <button 
                        onClick={() => handleCommand(ControlCommand.TOGGLE_VALVE_3_4)}
                        className={`switch ${valves[2] ? 'active-green' : ''}`}
                    >
                        <span className="switch-knob" />
                    </button>
                </div>

            </div>
        </div>

      </div>
    </Card>
  );
};

export default HydraulicPanel;