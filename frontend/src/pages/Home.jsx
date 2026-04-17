import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PenLine, Link2, RefreshCw, Shield, ArrowRight } from "lucide-react";
import "../styles/Home.css";

const steps = [
  {
    number: "01",
    icon: <Link2 size={20} />,
    title: "Choose your path",
    description:
      "Navigate to any custom URL like notepad.app/my-journal or notepad.app/project-ideas. Your path is your note's unique address.",
  },
  {
    number: "02",
    icon: <PenLine size={20} />,
    title: "Start writing",
    description:
      "Your note loads instantly. Type freely — every keystroke is captured and synced automatically after a short pause.",
  },
  {
    number: "03",
    icon: <RefreshCw size={20} />,
    title: "Return anytime",
    description:
      "Visit the same path from any device, any browser. Your words will be right where you left them.",
  },
  {
    number: "04",
    icon: <Shield size={20} />,
    title: "Keep it secret",
    description:
      "Use a long, unique path as your password. Nobody can guess /q7x-morning-thoughts-2024 — only you know it.",
  },
];

const examples = [
  "/shopping-list",
  "/meeting-notes-q4",
  "/my-poem",
  "/quick-ideas",
  "/travel-packing",
];

export default function Home() {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  function handleGo() {
    const val = inputRef.current.value.trim().replace(/^\/+/, "");
    if (val) navigate(`/${val}`);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleGo();
  }

  useEffect(() => {
    const cards = document.querySelectorAll(".step-card");
    cards.forEach((card, i) => {
      card.style.animationDelay = `${i * 0.12 + 0.2}s`;
    });
  }, []);

  return (
    <div className="home-root">
      {/* Decorative background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      {/* Nav */}
      <nav className="home-nav">
        <div className="nav-logo">
          <img src="/icon.png" alt="Notepad" className="nav-icon" />
          <span>Notepad</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">No sign-up. No fuss.</div>
        <h1 className="hero-title">
          Your thoughts,
          <br />
          <em>instantly saved.</em>
        </h1>
        <p className="hero-sub">
          A distraction-free notepad that lives at any URL you choose.
          <br className="br-desktop" /> Share a link, save privately, or just
          jot something down.
        </p>

        {/* URL Input */}
        <div className="url-bar">
          <span className="url-prefix">notepad.app/</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="your-custom-path"
            className="url-input"
            onKeyDown={handleKeyDown}
            spellCheck={false}
          />
          <button className="url-go-btn" onClick={handleGo}>
            Open <ArrowRight size={15} strokeWidth={2.2} />
          </button>
        </div>

        {/* Example chips */}
        <div className="example-chips">
          <span className="chips-label">Try:</span>
          {examples.map((ex) => (
            <button
              key={ex}
              className="chip"
              onClick={() => navigate(ex)}
            >
              {ex}
            </button>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="how-section">
        <div className="section-label">How it works</div>
        <h2 className="section-title">Simple by design</h2>
        <div className="steps-grid">
          {steps.map((step) => (
            <div className="step-card" key={step.number}>
              <div className="step-top">
                <span className="step-number">{step.number}</span>
                <span className="step-icon">{step.icon}</span>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-card">
          <h2 className="cta-title">Ready to write?</h2>
          <p className="cta-sub">Pick any path and start immediately.</p>
          <button className="cta-btn" onClick={() => navigate("/my-notes")}>
            Open my-notes <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <footer className="home-footer">
        <img src="/icon.png" alt="" className="footer-icon" />
        <span>Notepad — write freely, anywhere.</span>
      </footer>
    </div>
  );
}