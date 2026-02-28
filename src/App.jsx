import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Leaderboard from './components/Leaderboard';
import { getRandomProblems } from './data/problems';
import { runCode, judgeSession } from './utils/judgeSession';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, PlayCircle, Send, Code, TerminalSquare, Settings2, Cpu, CheckCircle2, Loader2, Users, AlertTriangle, Download, Trophy } from 'lucide-react';
import { cn } from './utils/cn';

const TOTAL_TIME = 45 * 60; // 45 minutes in seconds
const LANGUAGES = ['Python', 'JavaScript', 'Java', 'C++'];

export default function App() {
  // Login state
  const [teamName, setTeamName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  
  // Tab violation tracking
  const [tabViolations, setTabViolations] = useState(0);
  const [showViolationWarning, setShowViolationWarning] = useState(false);
  const startTimeRef = useRef(null);

  const [problems, setProblems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isExecuting, setIsExecuting] = useState(false);
  const [output, setOutput] = useState(null); // { stdout: '', stderr: '', error: '' }

  // User answers state: { problemId: { language: '...', code: '...' } }
  const [answers, setAnswers] = useState({});

  // Submission evaluation state
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [submissionReport, setSubmissionReport] = useState({});
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    // Initialize 3 random problems
    const selected = getRandomProblems(3);
    setProblems(selected);

    // Initialize answers state with default boilerplates
    const initialAnswers = {};
    selected.forEach(p => {
      initialAnswers[p.id] = {
        language: 'Python',
        code: p.boilerplates.python
      };
    });
    setAnswers(initialAnswers);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsSubmitted(true);
      return;
    }

    if (isSubmitted || !isLoggedIn) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted, isLoggedIn]);

  // Alt+Tab / Focus loss detection
  useEffect(() => {
    if (!isLoggedIn || isSubmitted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabViolations(prev => prev + 1);
        setShowViolationWarning(true);
        setTimeout(() => setShowViolationWarning(false), 3000);
      }
    };

    const handleBlur = () => {
      setTabViolations(prev => prev + 1);
      setShowViolationWarning(true);
      setTimeout(() => setShowViolationWarning(false), 3000);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [isLoggedIn, isSubmitted]);

  // Handle team login
  const handleLogin = (e) => {
    e.preventDefault();
    if (teamName.trim().length < 2) {
      alert('Please enter a valid team name (at least 2 characters)');
      return;
    }
    startTimeRef.current = Date.now();
    setIsLoggedIn(true);
  };

  // Download session data as JSON
  const downloadSessionJSON = () => {
    if (!sessionData) return;
    const blob = new Blob([JSON.stringify(sessionData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${teamName.replace(/\s+/g, '_')}_session_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Login Page
  if (!isLoggedIn) {
    // Show Leaderboard if requested
    if (showLeaderboard) {
      return <Leaderboard onBack={() => setShowLeaderboard(false)} />;
    }

    return (
      <div className="h-screen w-screen flex items-center justify-center bg-dark-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-800 border border-dark-border rounded-2xl p-8 max-w-md w-full mx-4 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-500/50">
              <Users size={32} className="text-brand-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">CodeVault Challenge</h1>
            <p className="text-gray-400">Enter your team name to begin the coding session</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Team Name</label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter your team name..."
                className="w-full bg-dark-900 border border-dark-border text-white rounded-lg px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 placeholder-gray-600"
                autoFocus
              />
            </div>

            <div className="bg-dark-900/50 rounded-lg p-4 border border-dark-border/50">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Session Rules:</h3>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• You have {TOTAL_TIME / 60} minutes to solve 3 problems</li>
                <li>• Tab switching (Alt+Tab) will be recorded</li>
                <li>• Your code and time will be saved at the end</li>
                <li>• Python and JavaScript are auto-evaluated</li>
              </ul>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-400 hover:to-indigo-500 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-[0_0_15px_rgba(79,70,229,0.4)] hover:shadow-[0_0_20px_rgba(79,70,229,0.6)]"
              >
                Start Session
              </button>
              
              <button
                type="button"
                onClick={() => setShowLeaderboard(true)}
                className="w-full flex items-center justify-center gap-2 glass-button py-3 text-gray-400 hover:text-yellow-400 hover:border-yellow-500/50"
              >
                <Trophy size={18} />
                View Leaderboard
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  if (problems.length === 0) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-dark-900 text-brand-500">
        <div className="animate-spin"><Cpu size={48} /></div>
      </div>
    );
  }

  const currentProblem = problems[currentIndex];
  const currentAnswer = answers[currentProblem.id];

  const handleLanguageChange = (lang) => {
    setOutput(null); // Clear previous output on language change
    const langKey = lang.toLowerCase().replace('++', 'pp');
    setAnswers(prev => ({
      ...prev,
      [currentProblem.id]: {
        ...prev[currentProblem.id],
        language: lang,
        code: currentProblem.boilerplates[langKey] || ''
      }
    }));
  };

  const handleCodeChange = (e) => {
    setOutput(null); // Clear previous output on code change
    setAnswers(prev => ({
      ...prev,
      [currentProblem.id]: {
        ...prev[currentProblem.id],
        code: e.target.value
      }
    }));
  };

  const handleRunCode = async () => {
    const lang = currentAnswer?.language || 'Python';
    const code = currentAnswer?.code || '';

    if (!code.trim()) {
      setOutput({ error: 'Please enter some code before running.' });
      return;
    }

    setIsExecuting(true);
    setOutput(null);
    try {
      // Automatically test your solution with example inputs (like LeetCode)
      const result = await runCode(currentProblem.id, lang, code);
      setOutput(result);
    } catch (err) {
      setOutput({ error: 'Failed to execute code: ' + err.message });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSubmit = async () => {
    if (!window.confirm("Are you sure you want to submit your session?")) return;
    
    setIsEvaluating(true);
    try {
      const report = await judgeSession(problems, answers);
      setSubmissionReport(report);
      
      // Calculate time taken
      const endTime = Date.now();
      const timeTakenMs = endTime - startTimeRef.current;
      const timeTakenSeconds = Math.floor(timeTakenMs / 1000);
      const minutes = Math.floor(timeTakenSeconds / 60);
      const seconds = timeTakenSeconds % 60;

      // Build session data for JSON export
      const data = {
        teamName: teamName,
        sessionDate: new Date().toISOString(),
        timeTaken: {
          totalSeconds: timeTakenSeconds,
          formatted: `${minutes}m ${seconds}s`
        },
        tabViolations: tabViolations,
        problems: problems.map((p, idx) => ({
          questionNumber: idx + 1,
          problemId: p.id,
          title: p.title,
          difficulty: p.difficulty,
          language: answers[p.id]?.language || 'N/A',
          code: answers[p.id]?.code || '',
          result: report[p.id]?.status || 'skipped',
          testsPassed: report[p.id]?.passed || 0,
          testsTotal: report[p.id]?.total || 0
        })),
        summary: {
          totalProblems: 3,
          correct: Object.values(report).filter(r => r.status === 'correct').length,
          wrong: Object.values(report).filter(r => r.status === 'wrong').length,
          skipped: Object.values(report).filter(r => r.status === 'skipped').length
        }
      };

      setSessionData(data);
      
      // Save to leaderboard (localStorage)
      const existing = JSON.parse(localStorage.getItem('leaderboard') || '[]');
      existing.push(data);
      localStorage.setItem('leaderboard', JSON.stringify(existing));
      
      setIsSubmitted(true);
    } catch (err) {
      alert('Evaluation failed: ' + err.message);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-900">
      <Navbar timeLeft={timeLeft} totalTime={TOTAL_TIME} isSubmitted={isSubmitted} teamName={teamName} tabViolations={tabViolations} />

      {/* Tab Violation Warning */}
      <AnimatePresence>
        {showViolationWarning && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-danger-900/90 border border-danger-500 text-danger-200 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3"
          >
            <AlertTriangle size={20} className="text-danger-400" />
            <span className="font-medium">Tab switch detected! Violation #{tabViolations} recorded.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Workspace */}
      <main className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-4 p-4">

        {/* Left Pane: Problem Description */}
        <div className="glass-panel flex flex-col h-full overflow-hidden flex-1 relative">
          <div className="p-4 border-b border-dark-border bg-dark-900/50 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <span className="text-gray-400 font-mono text-sm">Problem {currentIndex + 1} of 3</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider ${currentProblem.difficulty === 'Easy' ? 'bg-success-900/50 text-success-400 border border-success-500/30' :
                'bg-warning-900/50 text-warning-400 border border-warning-500/30'
                }`}>
                {currentProblem.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentIndex(prev => Math.max(0, prev - 1));
                  setOutput(null);
                }}
                disabled={currentIndex === 0}
                className="p-1.5 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-1">
                {[0, 1, 2].map(idx => (
                  <div key={idx} className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-brand-500 w-4 shadow-[0_0_8px_rgba(79,70,229,0.8)]' :
                    answers[problems[idx]?.id]?.code !== problems[idx]?.boilerplates[answers[problems[idx]?.id]?.language.toLowerCase().replace('++', 'pp')] ? 'bg-success-500/50' : 'bg-dark-600'
                    }`} />
                ))}
              </div>
              <button
                onClick={() => {
                  setCurrentIndex(prev => Math.min(2, prev + 1));
                  setOutput(null);
                }}
                disabled={currentIndex === 2}
                className="p-1.5 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto overflow-x-hidden code-scroll flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProblem.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-white text-glow">{currentProblem.id}. {currentProblem.title}</h2>

                <div className="prose prose-invert prose-p:text-gray-300 prose-pre:bg-dark-900/50 prose-pre:border prose-pre:border-dark-border mb-8"
                  dangerouslySetInnerHTML={{ __html: currentProblem.description }} />

                <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                  <TerminalSquare size={18} className="text-brand-400" /> Examples
                </h3>
                <div className="space-y-4 mb-8">
                  {currentProblem.examples.map((ex, i) => (
                    <div key={i} className="bg-dark-900/30 border border-dark-border/50 rounded-lg p-4 font-mono text-sm leading-relaxed relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-brand-500/50 group-hover:bg-brand-400 transition-colors"></div>
                      <div className="mb-2"><span className="text-gray-500 select-none">Input:</span> <span className="text-brand-300 tracking-wide">{ex.input}</span></div>
                      <div className="mb-2"><span className="text-gray-500 select-none">Output:</span> <span className="text-success-400">{ex.output}</span></div>
                      {ex.explanation && <div><span className="text-gray-500 select-none">Explanation:</span> <span className="text-gray-400">{ex.explanation}</span></div>}
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                  <Settings2 size={18} className="text-brand-400" /> Constraints
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-400 mb-8 font-mono text-sm bg-dark-900/20 p-4 rounded-lg border border-dark-border/20">
                  {currentProblem.constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Pane: Code Editor */}
        <div className="flex flex-col gap-4 h-full overflow-hidden">

          <div className="glass-panel flex-1 flex flex-col overflow-hidden relative group">
            <div className="h-14 border-b border-dark-border bg-dark-900/80 flex items-center px-4 justify-between transition-colors">
              <div className="flex items-center gap-2">
                <Code size={18} className="text-gray-400" />
                <select
                  disabled={isSubmitted}
                  value={currentAnswer?.language || 'Python'}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="bg-dark-800 border border-dark-border text-gray-200 text-sm rounded-md px-3 py-1.5 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 appearance-none min-w-[120px] cursor-pointer"
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleRunCode}
                  className="text-gray-400 hover:text-white text-sm flex items-center gap-1.5 px-2 py-1 rounded transition-colors disabled:opacity-50"
                  disabled={isSubmitted || isExecuting}
                >
                  <PlayCircle size={16} className={isExecuting ? "animate-spin" : ""} /> {isExecuting ? 'Running...' : 'Run Code'}
                </button>
              </div>
            </div>

            <div className="flex-1 relative bg-[#0d1117] font-mono text-sm group-hover:shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] transition-shadow duration-500">
              <textarea
                spellCheck={false}
                disabled={isSubmitted || isExecuting}
                value={currentAnswer?.code || ''}
                onChange={handleCodeChange}
                className="absolute inset-0 w-full h-[65%] bg-transparent text-gray-300 p-6 resize-none focus:outline-none code-scroll leading-relaxed tracking-wide placeholder-dark-600 disabled:opacity-70"
                placeholder="Write your solution here..."
                style={{ tabSize: 4 }}
              />

              {/* Output Pane */}
              <div className="absolute inset-x-0 bottom-0 h-[35%] bg-dark-900/90 border-t border-dark-border/50 flex flex-col backdrop-blur-sm z-10 transition-transform duration-300 ease-in-out font-mono code-scroll">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0 bg-dark-900 border-b border-dark-border shadow-sm flex items-center justify-between">
                  <span>Output</span>
                  {output && <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px]",
                    (output.code === 0 && !output.error && !output.stderr) ? "bg-success-900/50 text-success-400 border border-success-500/30" : "bg-danger-900/50 text-danger-400 border border-danger-500/30"
                  )}>
                    {output.error ? "Error" : output.code === 0 ? "Success" : `Exited with code ${output.code}`}
                  </span>}
                </div>
                <div className="p-4 overflow-y-auto flex-1 code-scroll text-sm">
                  {!output && !isExecuting && (
                    <div className="h-full flex items-center justify-center text-gray-600 select-none">
                      Run code to see output
                    </div>
                  )}
                  {isExecuting && (
                    <div className="text-brand-400 animate-pulse">Running...</div>
                  )}
                  {output && (
                    <div className="space-y-4 whitespace-pre-wrap break-words">
                      {output.error && (
                        <div className="text-danger-400">{output.error}</div>
                      )}
                      {output.stderr && (
                        <div className="text-danger-400">{output.stderr}</div>
                      )}
                      {output.stdout && (
                        <div className="text-gray-300">{output.stdout}</div>
                      )}
                      {(!output.error && !output.stderr && !output.stdout) && (
                        <div className="text-gray-500 italic">Program executed successfully with no output.</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-[35%] h-6 bg-gradient-to-t from-dark-900/20 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="glass-panel p-4 flex items-center justify-between shrink-0 bg-dark-800/90">
            <div className="text-sm text-gray-400 font-mono">
              Auto-saved at {new Date().toLocaleTimeString()}
            </div>

            <div className="flex items-center gap-3">
              {currentIndex < 2 && (
                <button
                  onClick={() => {
                    setCurrentIndex(prev => prev + 1);
                    setOutput(null);
                  }}
                  className="glass-button px-6 py-2.5 text-gray-200 hover:text-white"
                >
                  Next Problem
                </button>
              )}
              <button
                onClick={handleSubmit}
                disabled={isSubmitted || isEvaluating}
                className="flex items-center gap-2 bg-gradient-to-r from-success-500 to-emerald-600 hover:from-success-400 hover:to-emerald-500 text-white font-semibold px-6 py-2.5 rounded-lg active:scale-95 transition-all duration-200 shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEvaluating ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} className={isSubmitted ? "" : "animate-[pulse_2s_ease-in-out_infinite]"} />
                )}
                {isEvaluating ? 'Evaluating...' : isSubmitted ? 'Session Submitted' : 'Submit Session'}
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Submission Overlay */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-dark-800 border border-dark-border shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-success-400 via-brand-500 to-warning-400"></div>
              <div className="w-20 h-20 bg-success-900/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-success-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <CheckCircle2 size={40} className="text-success-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2 text-glow">Evaluation Complete</h2>
              <p className="text-gray-400 mb-4">Team: <span className="text-brand-400 font-semibold">{teamName}</span></p>
              
              {sessionData && (
                <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                  <div className="bg-dark-900/50 rounded-lg p-2 border border-dark-border">
                    <div className="text-gray-500 text-xs">Time Taken</div>
                    <div className="text-white font-mono">{sessionData.timeTaken.formatted}</div>
                  </div>
                  <div className={cn(
                    "rounded-lg p-2 border",
                    tabViolations > 0 ? "bg-danger-900/30 border-danger-500/50" : "bg-dark-900/50 border-dark-border"
                  )}>
                    <div className="text-gray-500 text-xs">Tab Violations</div>
                    <div className={tabViolations > 0 ? "text-danger-400 font-mono" : "text-success-400 font-mono"}>
                      {tabViolations}
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 mb-8 text-left">
                {problems.map((p, idx) => {
                  const result = submissionReport[p.id];
                  const status = result?.status || 'skipped';
                  
                  return (
                    <div key={idx} className="bg-dark-900/50 rounded-lg p-3 border border-dark-border text-center">
                      <div className="text-xs text-gray-500 mb-1 font-mono">Q{idx + 1}</div>
                      <div className={cn(
                        "font-medium text-sm",
                        status === 'correct' ? "text-success-400" :
                        status === 'wrong' ? "text-danger-400" :
                        status === 'error' ? "text-warning-400" :
                        status === 'unsupported' ? "text-brand-400" :
                        "text-gray-600"
                      )}>
                        {status === 'correct' ? `✓ Correct (${result.passed}/${result.total})` :
                         status === 'wrong' ? `✗ Wrong (${result.passed}/${result.total})` :
                         status === 'error' ? '⚠ Error' :
                         status === 'unsupported' ? '— Unsupported' :
                         '— Skipped'}
                      </div>
                      {result?.message && status !== 'correct' && status !== 'skipped' && (
                        <div className="text-xs text-gray-500 mt-1 truncate" title={result.message}>
                          {result.message}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="space-y-3">
                <button
                  onClick={downloadSessionJSON}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-400 hover:to-indigo-500 text-white font-semibold py-3 rounded-lg transition-all duration-200"
                >
                  <Download size={18} />
                  Download Results (JSON)
                </button>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setShowLeaderboard(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 glass-button py-3 text-yellow-400 hover:text-yellow-300 hover:border-yellow-500/50"
                >
                  <Trophy size={18} />
                  View Leaderboard
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full glass-button py-3 text-gray-400 hover:text-gray-300 hover:bg-dark-700/50"
                >
                  Start New Session
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
