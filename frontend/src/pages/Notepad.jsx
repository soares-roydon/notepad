import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Save,
  CheckCircle2,
  ArrowLeft,
  Clock,
  Hash,
} from "lucide-react";
import "../styles/Notepad.css";

export default function Notepad() {
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("idle"); // idle | saving | saved
  const [lastSaved, setLastSaved] = useState(null);
  const { filename } = useParams();
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const userEditedRef = useRef(false);

  /* ── Derived stats ── */
  const wordCount = note.trim() === "" ? 0 : note.trim().split(/\s+/).length;
  const charCount = note.length;

  /* ── Load ── */
  useEffect(() => {
    const controller = new AbortController();
    userEditedRef.current = false;

    fetch(`https://notepad-awzd.onrender.com/${filename}`, {
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((data) => setNote(data.text))
      .catch(() => {});

    return () => controller.abort();
  }, [filename]);

  /* ── Auto-save (only after user edits) ── */
  useEffect(() => {
    if (!userEditedRef.current) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setStatus("idle");
    timerRef.current = setTimeout(() => syncText(), 1200);
    return () => clearTimeout(timerRef.current);
  }, [note]);

  function syncText() {
    setStatus("saving");
    fetch(`https://notepad-awzd.onrender.com/${filename}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: note }),
    })
      .then(() => {
        setStatus("saved");
        setLastSaved(new Date());
      })
      .catch(() => setStatus("idle"));
  }

  /* ── Manual save ── */
  function handleSave() {
    if (timerRef.current) clearTimeout(timerRef.current);
    syncText();
  }

  /* ── Formatted last-saved ── */
  function formatTime(date) {
    if (!date) return "";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div className="np-root">
      {/* Subtle grid texture */}
      <div className="np-texture" aria-hidden="true" />

      {/* ── Sidebar strip (desktop) ── */}
      <aside className="np-sidebar">
        <button className="np-logo" onClick={() => navigate("/")}>
          <img src="/icon.png" alt="Notepad" className="np-logo-icon" />
        </button>
        <div className="np-sidebar-divider" />
        <div className="np-stat-pill" title="Words">
          <Hash size={12} />
          <span>{wordCount}</span>
        </div>
        <div className="np-stat-pill" title="Characters">
          <span className="np-char-label">Aa</span>
          <span>{charCount}</span>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="np-main">
        {/* Header */}
        <header className="np-header">
          <button className="np-back-btn" onClick={() => navigate("/")}>
            <ArrowLeft size={15} strokeWidth={2} />
            <span>Home</span>
          </button>

          <div className="np-path-pill">
            <span className="np-path-prefix">notepad.app/</span>
            <span className="np-path-name">{filename}</span>
          </div>

          <div className="np-header-right">
            {/* Status indicator */}
            <div className={`np-status np-status--${status}`}>
              {status === "saving" && (
                <>
                  <span className="np-spinner" />
                  <span>Saving…</span>
                </>
              )}
              {status === "saved" && (
                <>
                  <CheckCircle2 size={13} />
                  <span>Saved {formatTime(lastSaved)}</span>
                </>
              )}
              {status === "idle" && lastSaved && (
                <>
                  <Clock size={13} />
                  <span>Last saved {formatTime(lastSaved)}</span>
                </>
              )}
            </div>

            <button className="np-save-btn" onClick={handleSave}>
              <Save size={14} strokeWidth={2.2} />
              <span>Save</span>
            </button>
          </div>
        </header>

        {/* Writing area */}
        <main className="np-writing-area">
          <textarea
            value={note}
            onChange={(e) => {
              userEditedRef.current = true;
              setNote(e.target.value);
            }}
            placeholder="Start writing… your words are saved automatically."
            className="np-textarea"
            spellCheck={true}
          />
        </main>

        {/* Footer (mobile stats) */}
        <footer className="np-footer">
          <div className="np-footer-stats">
            <span>{wordCount} words</span>
            <span className="np-dot">·</span>
            <span>{charCount} chars</span>
          </div>
          <div className={`np-status np-status--${status} np-status-mobile`}>
            {status === "saving" && (
              <>
                <span className="np-spinner" />
                <span>Saving…</span>
              </>
            )}
            {status === "saved" && (
              <>
                <CheckCircle2 size={12} />
                <span>Saved</span>
              </>
            )}
            {status === "idle" && <span>Auto-save on</span>}
          </div>
        </footer>
      </div>
    </div>
  );
}