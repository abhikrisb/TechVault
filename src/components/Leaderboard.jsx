import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, AlertTriangle, CheckCircle2, XCircle, Code2, ArrowLeft, Trash2, Medal, Download, Upload } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Leaderboard({ onBack }) {
  const [entries, setEntries] = useState([]);
  const importInputRef = useRef(null);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    const stored = localStorage.getItem('leaderboard');
    if (stored) {
      const data = JSON.parse(stored);
      setEntries(sortEntries(data));
    } else {
      setEntries([]);
    }
  };

  const sortEntries = (data) => {
    return [...data].sort((a, b) => {
      if (b.summary.correct !== a.summary.correct) return b.summary.correct - a.summary.correct;
      if (a.timeTaken.totalSeconds !== b.timeTaken.totalSeconds) return a.timeTaken.totalSeconds - b.timeTaken.totalSeconds;
      return a.tabViolations - b.tabViolations;
    });
  };

  const exportLeaderboard = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      entries
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `leaderboard_export_${Date.now()}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  const triggerImport = () => {
    importInputRef.current?.click();
  };

  const importLeaderboard = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const incoming = Array.isArray(parsed) ? parsed : parsed.entries;

      if (!Array.isArray(incoming)) {
        alert('Invalid file format. Please import a leaderboard JSON export.');
        return;
      }

      const existing = JSON.parse(localStorage.getItem('leaderboard') || '[]');
      const mergedMap = new Map();

      [...existing, ...incoming].forEach((item, idx) => {
        const key = item.sessionDate || `${item.teamName || 'team'}-${idx}`;
        mergedMap.set(key, item);
      });

      const merged = sortEntries(Array.from(mergedMap.values()));
      localStorage.setItem('leaderboard', JSON.stringify(merged));
      setEntries(merged);
      alert(`Imported successfully. Total entries: ${merged.length}`);
    } catch {
      alert('Could not import leaderboard. Please choose a valid JSON file.');
    } finally {
      event.target.value = '';
    }
  };

  const clearLeaderboard = () => {
    if (window.confirm('Are you sure you want to clear all leaderboard data?')) {
      localStorage.removeItem('leaderboard');
      setEntries([]);
    }
  };

  const getRankIcon = (index) => {
    if (index === 0) return <Medal className="text-yellow-400" size={24} />;
    if (index === 1) return <Medal className="text-gray-400" size={24} />;
    if (index === 2) return <Medal className="text-amber-600" size={24} />;
    return <span className="text-gray-500 font-mono w-6 text-center">{index + 1}</span>;
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <nav className="h-16 border-b border-dark-border bg-dark-900/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center border border-brand-500/50 text-brand-400">
            <Code2 size={20} />
          </div>
          <h1 className="font-bold text-lg tracking-tight">Tech<span className="text-brand-400 font-mono">Vault</span></h1>
        </div>

        <div className="flex items-center gap-3">
          <input
            ref={importInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={importLeaderboard}
          />
          <button
            onClick={triggerImport}
            className="flex items-center gap-2 text-gray-500 hover:text-brand-400 transition-colors text-sm"
          >
            <Upload size={16} />
            Import
          </button>
          <button
            onClick={exportLeaderboard}
            className="flex items-center gap-2 text-gray-500 hover:text-success-400 transition-colors text-sm"
          >
            <Download size={16} />
            Export
          </button>
          <button
            onClick={clearLeaderboard}
            className="flex items-center gap-2 text-gray-500 hover:text-danger-400 transition-colors text-sm"
          >
            <Trash2 size={16} />
            Clear All
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-brand-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-500/50">
            <Trophy size={40} className="text-brand-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Leaderboard</h1>
          <p className="text-gray-400">Rankings based on correct answers, time taken, and tab violations</p>
        </motion.div>

        {entries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-600 text-lg">No submissions yet</div>
            <p className="text-gray-500 text-sm mt-2">Complete a coding session to appear on the leaderboard</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <div className="col-span-1">Rank</div>
              <div className="col-span-3">Team</div>
              <div className="col-span-2 text-center">Score</div>
              <div className="col-span-2 text-center">Time</div>
              <div className="col-span-2 text-center">Violations</div>
              <div className="col-span-2 text-center">Date</div>
            </div>

            {/* Entries */}
            {entries.map((entry, index) => (
              <motion.div
                key={entry.sessionDate}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "grid grid-cols-12 gap-4 px-4 py-4 rounded-xl border transition-all",
                  index === 0 ? "bg-yellow-900/10 border-yellow-500/30" :
                  index === 1 ? "bg-gray-800/30 border-gray-500/30" :
                  index === 2 ? "bg-amber-900/10 border-amber-600/30" :
                  "bg-dark-800/50 border-dark-border hover:border-dark-600"
                )}
              >
                {/* Rank */}
                <div className="col-span-1 flex items-center">
                  {getRankIcon(index)}
                </div>

                {/* Team Name */}
                <div className="col-span-3 flex items-center">
                  <span className={cn(
                    "font-semibold",
                    index === 0 ? "text-yellow-400" :
                    index === 1 ? "text-gray-300" :
                    index === 2 ? "text-amber-500" :
                    "text-white"
                  )}>
                    {entry.teamName}
                  </span>
                </div>

                {/* Score */}
                <div className="col-span-2 flex items-center justify-center gap-1">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 size={14} className="text-success-400" />
                    <span className="text-success-400 font-mono">{entry.summary.correct}</span>
                  </div>
                  <span className="text-gray-600">/</span>
                  <div className="flex items-center gap-1">
                    <XCircle size={14} className="text-danger-400" />
                    <span className="text-danger-400 font-mono">{entry.summary.wrong}</span>
                  </div>
                </div>

                {/* Time */}
                <div className="col-span-2 flex items-center justify-center">
                  <div className="flex items-center gap-1.5 text-gray-300">
                    <Clock size={14} className="text-brand-400" />
                    <span className="font-mono">{entry.timeTaken.formatted}</span>
                  </div>
                </div>

                {/* Violations */}
                <div className="col-span-2 flex items-center justify-center">
                  <div className={cn(
                    "flex items-center gap-1.5 px-2 py-0.5 rounded-full text-sm",
                    entry.tabViolations === 0 ? "text-success-400" : "text-danger-400 bg-danger-900/30"
                  )}>
                    {entry.tabViolations > 0 && <AlertTriangle size={12} />}
                    <span className="font-mono">{entry.tabViolations}</span>
                  </div>
                </div>

                {/* Date */}
                <div className="col-span-2 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">
                    {new Date(entry.sessionDate).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        {entries.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 grid grid-cols-3 gap-4"
          >
            <div className="bg-dark-800/50 rounded-xl p-4 border border-dark-border text-center">
              <div className="text-3xl font-bold text-brand-400">{entries.length}</div>
              <div className="text-gray-500 text-sm">Total Teams</div>
            </div>
            <div className="bg-dark-800/50 rounded-xl p-4 border border-dark-border text-center">
              <div className="text-3xl font-bold text-success-400">
                {Math.round((entries.reduce((acc, e) => acc + e.summary.correct, 0) / (entries.reduce((acc, e) => acc + (e.summary.totalProblems || 0), 0) || 1)) * 100)}%
              </div>
              <div className="text-gray-500 text-sm">Avg Success Rate</div>
            </div>
            <div className="bg-dark-800/50 rounded-xl p-4 border border-dark-border text-center">
              <div className="text-3xl font-bold text-warning-400">
                {Math.round(entries.reduce((acc, e) => acc + e.timeTaken.totalSeconds, 0) / entries.length / 60)}m
              </div>
              <div className="text-gray-500 text-sm">Avg Time</div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
