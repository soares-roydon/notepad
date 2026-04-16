import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Save,
  Settings,
  FileText,
  CheckCircle2,
  Type,
  AlignLeft,
  Image as ImageIcon,
} from "lucide-react";

function Notepad() {
  const [note, setNote] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const { filename } = useParams();

  // Simple word counter for better UX feedback
  useEffect(() => {
    const words = note.trim().split(/\s+/);
    setWordCount(note.trim() === "" ? 0 : words.length);
  }, [note]);

  useEffect(() => {
    // 1. Put your standard fetch() logic here!
    // 2. Parse the JSON.
    // 3. Update your state buckets with the new data.
    // 4. Turn your loading state to false.

    fetch(`http://localhost:3000/${filename}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (note) {
        setNote(note.text);
      });
  }, []);

  useEffect(() => {
    const timerId = setTimeout(syncText, 1000);
    return function () {
      clearTimeout(timerId);
    };
  }, [note]);

  function syncText() {
    fetch(`http://localhost:3000/${filename}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: note }),
    });
  }

  return (
    // Outer background: Soft gray on desktop, hidden on mobile
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-0 md:p-6 lg:p-12 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Main Application Window: Full screen on mobile, floating card on desktop */}
      <div className="w-full h-screen md:h-[85vh] max-w-5xl bg-white md:rounded-2xl md:shadow-xl flex flex-col md:border border-slate-200 overflow-hidden transition-all">
        {/* Header / Toolbar */}
        <header className="px-4 py-3 sm:px-6 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-md z-10">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600">
              <FileText className="w-5 h-5" />
            </div>
            {/* Formatting Tools (Hidden on very small screens to prevent crowding) */}
            <div className="hidden sm:flex items-center space-x-1 border-l border-slate-200 pl-4 ml-2">
              <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-all">
                <Type className="w-4 h-4" />
              </button>
              <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-all">
                <AlignLeft className="w-4 h-4" />
              </button>
              <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-all">
                <ImageIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-all">
              <Settings className="w-5 h-5" />
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-all shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none">
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save Note</span>
            </button>
          </div>
        </header>

        {/* Writing Area */}
        <main className="flex-1 flex flex-col p-5 sm:p-8 md:p-12 overflow-y-auto custom-scrollbar">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Start typing your note here..."
            className="flex-1 w-full bg-transparent outline-none text-lg sm:text-xl text-slate-700 placeholder-slate-300 resize-none leading-relaxed focus:ring-0"
          />
        </main>

        {/* Status Bar / Footer */}
        <footer className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs sm:text-sm text-slate-500">
          <div className="flex items-center space-x-4">
            <span className="font-medium text-slate-600">
              {wordCount} words
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="hidden sm:inline">
              {console.log(note)} characters
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Ready to save</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Notepad;
