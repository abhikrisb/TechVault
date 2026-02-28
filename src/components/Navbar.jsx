import { useState, useEffect } from 'react';
import { Timer, Code2, CheckCircle2, Users, AlertTriangle } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Navbar({ timeLeft, totalTime, isSubmitted, teamName, tabViolations = 0 }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const percentage = (timeLeft / totalTime) * 100;
  const isWarning = timeLeft < 120; // less than 2 minutes
  const isDanger = timeLeft < 30; // less than 30 seconds

  return (
    <nav className="h-16 border-b border-dark-border bg-dark-900/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3 items-center">
        <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center border border-brand-500/50 text-brand-400">
          <Code2 size={20} />
        </div>
        <h1 className="font-bold text-lg tracking-tight">Tech<span className="text-brand-400 font-mono">Vault</span></h1>
        
        {/* Team Name */}
        {teamName && (
          <div className="flex items-center gap-2 ml-4 px-3 py-1 rounded-full bg-dark-800 border border-dark-border text-sm">
            <Users size={14} className="text-brand-400" />
            <span className="text-gray-300">{teamName}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Tab Violations Counter */}
        {!isSubmitted && tabViolations > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-danger-900/50 border border-danger-500/50 text-danger-400 text-sm">
            <AlertTriangle size={14} />
            <span className="font-mono">{tabViolations} violation{tabViolations !== 1 ? 's' : ''}</span>
          </div>
        )}

        {!isSubmitted && (
          <div className={cn(
            "flex items-center gap-3 px-4 py-1.5 rounded-full border transition-all duration-300",
            isDanger ? "bg-danger-900 border-danger-500/50 text-danger-400 animate-pulse" :
              isWarning ? "bg-warning-900 border-warning-500/50 text-warning-400" :
                "bg-dark-800 border-dark-border text-gray-300"
          )}>
            <Timer size={18} className={isDanger ? "animate-bounce" : ""} />
            <span className="font-mono font-medium text-lg tracking-wider">
              {formatTime(timeLeft)}
            </span>
          </div>
        )}

        {isSubmitted && (
          <div className="flex items-center gap-2 text-success-400 bg-success-900 px-4 py-1.5 rounded-full border border-success-500/50">
            <CheckCircle2 size={18} />
            <span className="font-medium text-sm">Session Completed</span>
          </div>
        )}

        <div className="w-8 h-8 rounded-full bg-dark-700 bg-[url('https://api.dicebear.com/7.x/avataaars/svg?seed=Felix')] bg-cover border border-dark-border cursor-pointer hover:border-brand-500 transition-colors"></div>
      </div>
    </nav>
  );
}
