import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '', icon }) => {
  return (
    <div className={`bg-scada-panel border border-scada-border rounded-lg shadow-lg overflow-hidden flex flex-col ${className}`}>
      <div className="bg-slate-800/50 px-4 py-3 border-b border-scada-border flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wider text-scada-text uppercase font-mono flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <div className="flex gap-1">
           <div className="w-2 h-2 rounded-full bg-scada-border"></div>
           <div className="w-2 h-2 rounded-full bg-scada-border"></div>
        </div>
      </div>
      <div className="p-4 flex-1 relative">
        {children}
      </div>
    </div>
  );
};

export default Card;