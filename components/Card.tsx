
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '', icon }) => {
  return (
    <div className={`scada-card ${className}`}>
      <div className="card-header">
        <h3 className="card-title">
          {icon}
          {title}
        </h3>
        <div className="flex gap-2">
           <div className="w-2 h-2 rounded-full" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#334155' }}></div>
           <div className="w-2 h-2 rounded-full" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#334155' }}></div>
        </div>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;