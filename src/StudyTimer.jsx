// App.jsx
import { useRef, useState, useEffect } from 'react';
import './App.css';

// ------------ helpers ------------
const uid = () => Math.random().toString(36).slice(2);

// TEMP stubs so file runs without your IndexedDB helpers.
// Replace these with your real idbGet/idbSet or remove them later.
async function idbGet(_key) { return null; }
async function idbSet(_key, _val) {}

// ------------ Quick Stats (Today + Week) ------------
// ------------ Quick Stats (Today + Week) ------------
function QuickStats({ title, selectedActivity, startTime, sessions = [] }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000); // re-render every second
    return () => clearInterval(id);
  }, []);

  const fmt = (ms) => {
    const s = Math.floor((ms / 1000) % 60);
    const m = Math.floor((ms / (1000 * 60)) % 60);
    const h = Math.floor(ms / (1000 * 60 * 60));
    return `${h}h ${m}m ${s}s`;
  };

  // --- helpers ---
  const todayISO = new Date().toISOString().slice(0, 10);
  const startOfWeekSunday = () => {
    const x = new Date();
    const day = x.getDay(); // 0 = Sun
    x.setHours(0, 0, 0, 0);
    x.setDate(x.getDate() - day);
    return x;
  };

  const sow = startOfWeekSunday();

  // --- totals ---
  const todayTotal = sessions.reduce((acc, s) => {
    if (s.dateISO === todayISO) return acc + (s.studyMs || 0);
    return acc;
  }, 0);

  const weekTotal = sessions.reduce((acc, s) => {
    const d = new Date(s.dateISO + "T00:00:00");
    return d >= sow ? acc + (s.studyMs || 0) : acc;
  }, 0);

  // add current running session
  const liveStudy = startTime ? (now - startTime) : 0;

  const displayToday = todayTotal + liveStudy;
  const displayWeek = weekTotal + liveStudy;

  const weekLabel = (() => {
    const d = sow;
    const opts = { year: "numeric", month: "short", day: "numeric" };
    return `Week of ${d.toLocaleDateString(undefined, opts)}`;
  })();

  return (
    <div className="qs-band">
      <div className="qs-row">
        <div className="qs-left">
          <span className="qs-label">Live Session</span>
          <span className="qs-dot">•</span>
          {selectedActivity ? (
            <span className="qs-pill">{selectedActivity}</span>
          ) : (
            <span className="qs-muted">No activity selected</span>
          )}
          {title ? (
            <>
              <span className="qs-dot">•</span>
              <span className="qs-title">{title}</span>
            </>
          ) : null}
        </div>

        <div className="qs-right">
          <span className="qs-stat">
            <span className="qs-stat-label">Today</span>
            <span className="qs-stat-value">{fmt(displayToday)}</span>
          </span>
          <span className="qs-sep" />
          <span className="qs-stat">
            <span className="qs-stat-label">{weekLabel}</span>
            <span className="qs-stat-value">{fmt(displayWeek)}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ------------ main component ------------
function StudyTimer() {
  // header date/time
  const [day, setDay] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('OUT');

  // anchors and totals
  const [startTime, setStartTime] = useState(null);
  const [breakTime, setBreakTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [studyTotal, setStudyTotal] = useState(0);
  const [breakTotal, setBreakTotal] = useState(0);

  // rendered rows
  const [rows, setRows] = useState([]);
  const [copied, setCopied] = useState(false);

  // toast
  const [toast, setToast] = useState(null);
  const showToast = (m, ms = 2000) => {
    setToast(m);
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => setToast(null), ms);
  };

  // control panel bits
  const [title, setTitle] = useState('');
  const [activityOptions, setActivityOptions] = useState(['Study', 'Reading', 'Practice', 'Project']);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // draggable panel
  const dragRef = useRef(null);
  const [panelPos, setPanelPos] = useState({ x: 24, y: 8 });
  const dragData = useRef({ dragging: false, offsetX: 0, offsetY: 0 });

  function onDragStart(e) {
    const el = dragRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    dragData.current.dragging = true;
    dragData.current.offsetX = e.clientX - r.left;
    dragData.current.offsetY = e.clientY - r.top;
    try { el.setPointerCapture?.(e.pointerId); } catch {}
  }
  function onDragMove(e) {
    if (!dragData.current.dragging) return;
    setPanelPos({ x: e.clientX - dragData.current.offsetX, y: e.clientY - dragData.current.offsetY });
  }
  function onDragEnd() { dragData.current.dragging = false; }

  useEffect(() => {
    window.addEventListener('pointermove', onDragMove);
    window.addEventListener('pointerup', onDragEnd);
    return () => {
      window.removeEventListener('pointermove', onDragMove);
      window.removeEventListener('pointerup', onDragEnd);
    };
  }, []);

  // date header
  useEffect(() => {
    const d = new Date();
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    setDay(days[d.getDay()]);
    setDate(`${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`);
  }, []);

  // sessions history (each End creates a summary)
  const [sessions, setSessions] = useState([]); // [{id,dateISO,studyMs,breakMs,createdAt,activity,title}]

  // load from idb (stubs now)
  useEffect(() => {
    let mounted = true;

    Promise.all([
      idbGet('rows'),
      idbGet('meta'),
      idbGet('sessions')
    ]).then(([savedRows, meta, savedSessions]) => {
      if (!mounted) return;
      if (Array.isArray(savedRows)) setRows(savedRows);
      if (meta) {
        setStatus(meta.status ?? 'OUT');
        setStudyTotal(meta.studyTotal ?? 0);
        setBreakTotal(meta.breakTotal ?? 0);
        setTitle(meta.title ?? '');
        setSelectedActivity(meta.selectedActivity ?? null);
      }
      if (Array.isArray(savedSessions)) setSessions(savedSessions);
    }).catch(() => { /* ignore for now */ });

    return () => { mounted = false; };
  }, []);

  // save to idb (stubs now)
  useEffect(() => {
    const t = setTimeout(() => {
      idbSet('rows', rows);
      idbSet('meta', {
        status,
        studyTotal,
        breakTotal,
        title,
        selectedActivity
      });
      idbSet('sessions', sessions);
    }, 350);
    return () => clearTimeout(t);
  }, [rows, status, studyTotal, breakTotal, title, selectedActivity, sessions]);

  // helpers
  const nowStr = () => new Date().toLocaleTimeString();
  const msToTime = (ms) => {
    const s = Math.floor((ms / 1000) % 60);
    const m = Math.floor((ms / (1000 * 60)) % 60);
    const h = Math.floor(ms / (1000 * 60 * 60));
    return `${h}h ${m}m ${s}s`;
  };

  const addRow = (label, details = []) => {
    setRows((prev) => [
      ...prev,
      { id: uid(), label, timeStr: nowStr(), open: false, details }
    ]);
  };
  const toggleRow = (id) => {
    setRows((prev) => prev.map(r => r.id === id ? { ...r, open: !r.open } : r));
  };

  // actions
  function handleStart() {
    if (startTime !== null) { showToast('Already started'); return; }
    const now = Date.now();
    setStartTime(now);
    setStatus('STUDYING');

    if (breakTime !== null) {
      const elapsedBreak = now - breakTime;
      setBreakTotal((t) => t + elapsedBreak);
      addRow('Resume', [
        `elapsed break: ${msToTime(elapsedBreak)}`,
        `total break: ${msToTime(breakTotal + elapsedBreak)}`
      ]);
      setBreakTime(null);
    } else {
      addRow('Start', ['(insert elapsed time details here)']);
    }
  }

  function handleBreak() {
    if (breakTime !== null) { showToast('Already on break'); return; }
    if (startTime === null) { showToast('Press Start first'); return; }

    const now = Date.now();
    const elapsedStudy = now - startTime;

    setStudyTotal((t) => t + elapsedStudy);
    setStartTime(null);
    setBreakTime(now);
    setStatus('ON BREAK');

    addRow('Break', [
      `elapsed study: ${msToTime(elapsedStudy)}`,
      `total study: ${msToTime(studyTotal + elapsedStudy)}`
    ]);
  }

  function handleEnd() {
  if (endTime !== null) { showToast('Session already ended'); return; }
  if (startTime == null && breakTime == null) { showToast('Nothing to end'); return; }

  const now = Date.now();
  setEndTime(now);
  setStatus('OUT');

  let elapsedStudy = 0;
  let elapsedBreak = 0;
  const endDetails = [];

  if (startTime !== null) {
    elapsedStudy = now - startTime;
    setStudyTotal(prev => prev + elapsedStudy); // ✅ still grows total
    endDetails.push(`elapsed study: ${msToTime(elapsedStudy)}`);
  }

  if (breakTime !== null) {
    elapsedBreak = now - breakTime;
    setBreakTotal(prev => prev + elapsedBreak);
    endDetails.push(`elapsed break: ${msToTime(elapsedBreak)}`);
  }

  endDetails.push(`total study: ${msToTime(studyTotal + elapsedStudy)}`);
  endDetails.push(`total break: ${msToTime(breakTotal + elapsedBreak)}`);

  setStartTime(null);
  setBreakTime(null);

  addRow('End', endDetails);

  // ✅ log only this session’s increment
  const dateISO = new Date().toISOString().slice(0,10);
  setSessions(prev => [
    ...prev,
    {
      id: uid(),
      dateISO,
      studyMs: elapsedStudy,
      breakMs: elapsedBreak,
      createdAt: Date.now(),
      activity: selectedActivity || null,
      title: title || null
    }
  ]);
}


  // copy / download
  const flatText = rows.map(r => {
    const head = `${r.label.toLowerCase()}: ${r.timeStr}`;
    if (!r.details?.length) return head;
    return [head, ...r.details].join('\n  ');
  }).join('\n');

  function copyLogs() {
    navigator.clipboard.writeText(flatText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }
  function downloadLogs() {
    const blob = new Blob([flatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'StudyLogs.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  // ------------ render ------------

  return (
    <div className="App">
      <header className="app-header">
        <div className="app-title-row">
          <h1 className="app-title">Study Time</h1>
          <div className="title-divider" />
          <div className="app-subtitle">
            <span>{day}</span>
            <span className="dot">•</span>
            <span>{date}</span>
          </div>
        </div>
      </header>

      {toast && <div className="toast">{toast}</div>}

    

{/* END control panel  */}

{/* NEW control panel */} 



<section className="control-area">
  <aside className="control-panel">
    
    {/* White header on top */}
    <div className="control-header">
      {title || <span style={{opacity:0.5}}>Insert Title</span>}
    </div>

    {/* Maroon body below */}
    <div className="control-body">
      <div className="field">
        <label className="field-label">Activity</label>
        <div className={`dropdown ${menuOpen && !editing ? 'open' : ''}`}>
          {!editing ? (
            <button
              type="button"
              className="dropdown-trigger"
              onClick={() => setMenuOpen(o => !o)}
            >
              <span className="truncate">
                {selectedActivity || 'Select activity'}
              </span>
              <span className="chev">▾</span>
            </button>
          ) : (
            <div className="trigger-editing">
              <input
                autoFocus
                className="trigger-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add activity"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const v = inputValue.trim();
                    if (!v) return;
                    if (!activityOptions.includes(v)) setActivityOptions(p => [...p, v]);
                    setSelectedActivity(v);
                    setEditing(false);
                    setInputValue('');
                  }
                  if (e.key === 'Escape') { setEditing(false); setInputValue(''); }
                }}
              />
              <button
                type="button"
                className="btn-mini ok"
                onClick={() => {
                  const v = inputValue.trim();
                  if (!v) return;
                  if (!activityOptions.includes(v)) setActivityOptions(p => [...p, v]);
                  setSelectedActivity(v);
                  setEditing(false);
                  setInputValue('');
                }}
              >✓</button>
              <button
                type="button"
                className="btn-mini cancel"
                onClick={() => { setEditing(false); setInputValue(''); }}
              >✕</button>
            </div>
          )}

          {menuOpen && !editing && (
            <div className="dropdown-menu">
              <button
                type="button"
                className="menu-item add-row"
                onClick={() => { setMenuOpen(false); setEditing(true); setInputValue(''); }}
              >
                <span>Add</span><span className="plus">＋</span>
              </button>
              <div className="menu-scroll">
                {activityOptions.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    className={`menu-text ${selectedActivity === opt ? 'active' : ''}`}
                    onClick={() => { setSelectedActivity(opt); setMenuOpen(false); }}
                    title={opt}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="circle-button-row panel-buttons">
        <div className="button-wrapper">
          <div className="label">Start</div>
          <button className="circle-button" onClick={handleStart}>▶</button>
        </div>
        <div className="button-wrapper">
          <div className="label">{status === 'On Break' ? 'Resume' : 'Break'}</div>
          <button className="circle-button" onClick={handleBreak}>
            {status === 'On Break' ? '⏵' : '⏸'}
          </button>
        </div>
        <div className="button-wrapper">
          <div className="label">End</div>
          <button className="circle-button stop-button" onClick={handleEnd}>■</button>
        </div>
      </div>

      <div className="status-box">
        status: <span>{status}</span>
      </div>
    </div>

  </aside>
</section>



      {/* Quick Stats bar (replaces tabs) */}

      <QuickStats 

        title={title}
        selectedActivity={selectedActivity}
        studyTotal={studyTotal}
        breakTotal={breakTotal}
        startTime={startTime}
        breakTime={breakTime}
        sessions={sessions}
      />

      {/* content */}

      <section className="content-area">
        <div id="logWrapper">
          
          <div className="log-section">
            <div id="logContainer">
              <div className="log-card">

                {rows.length === 0 && (
                  <div className="log-empty">(press Start to create the first entry)</div>
                )}

                { /* details dropdown */}
                {rows.map((r) => (
                  <div className="log-row" key={r.id}>
                    <div className="log-row-head">
                      <div className="log-left">
                        <span className="log-label">{r.label}:</span>
                        <span className="log-time">{r.timeStr}</span>
                      </div>

                      <button
                        className="details-btn"
                        onClick={() => toggleRow(r.id)}
                        aria-expanded={r.open}
                      >
                        <span className="details-text">Details</span>
                        <span className={`details-caret ${r.open ? 'open' : ''}`}>▸</span>
                      </button>
                    </div>

                    <div className="log-divider" />

                    <div className={`details-panel ${r.open ? 'show' : ''}`}>
                      {r.details?.length
                        ? r.details.map((d, i) => <div className="detail-line" key={i}>{d}</div>)
                        : <div className="detail-line">(insert elapsed time details here)</div>}
                    </div>
                  </div>
                ))}

              </div>
            </div>

            <div className="log-buttons">
              <div className="copy-container">
                <span className="copy-text" onClick={copyLogs}>Copy</span>
                {copied && <span className="copied-msg">Copied!</span>}
              </div>
              <div className="download-container">
                <span className="download-text" onClick={downloadLogs}>Download</span>
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}

export default StudyTimer;
