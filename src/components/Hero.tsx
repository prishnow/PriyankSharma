import { useEffect, useRef, useState, type FormEvent } from "react";
import styles from "./Hero.module.css";

const MANIFESTO =
  "Most design teams aren't AI-native. They're AI-aware teams running on a pre-AI operating system. I rebuild the operating system.";

const AGENT_RESPONSE =
  "Most design orgs in 2026 are AI-aware, which is a different thing from AI-native. They bought the licenses. The org chart did not change. The rituals did not change. The hiring rubric did not change. That is the gap I work on. Ask a more specific question if you want a more specific answer.";

const SUGGESTIONS = [
  "How would you build an AI-native design team?",
  "What's broken about how design orgs use AI today?",
  "What does the first 90 days look like?",
] as const;

const MANIFESTO_CPS = 55;
const RESPONSE_CPS = 30;
const FADE_MS = 200;
const CARET_STOP_AFTER_DONE_MS = 3000;
const SESSION_KEY = "hero-animated";

export default function Hero() {
  // Initial state renders the FULL manifesto for SSR (SEO + no-JS fallback).
  // The useEffect below will erase and retype it on first visit only.
  const [typedManifesto, setTypedManifesto] = useState(MANIFESTO);
  const [manifestoDone, setManifestoDone] = useState(true);
  const [caretOn, setCaretOn] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [fading, setFading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [typedResponse, setTypedResponse] = useState("");
  const [responseDone, setResponseDone] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // ---- Hover-reactive hairline (Cuberto-style bend toward cursor) ----
  const lineWrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const targetRef = useRef({ x: 0.5, y: 0 });
  const currentRef = useRef({ x: 0.5, y: 0 });

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const H = 30;
    const MAX_BEND = 18;
    let raf = 0;
    const loop = () => {
      const t = targetRef.current;
      const c = currentRef.current;
      c.x += (t.x - c.x) * 0.18;
      c.y += (t.y - c.y) * 0.18;
      const wrap = lineWrapRef.current;
      const path = pathRef.current;
      if (wrap && path) {
        const W = wrap.clientWidth;
        const cx = c.x * W;
        const cy = H / 2 + c.y * MAX_BEND;
        path.setAttribute("d", `M 0 ${H / 2} Q ${cx} ${cy} ${W} ${H / 2}`);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  function handleLineMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    targetRef.current.x = (e.clientX - rect.left) / rect.width;
    targetRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  }

  function handleLineLeave() {
    targetRef.current.x = 0.5;
    targetRef.current.y = 0;
  }

  // ---- Manifesto typing (first visit only; sessionStorage-gated) ----
  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let alreadyAnimated = false;
    try {
      alreadyAnimated = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* sessionStorage blocked (private mode, etc.) — treat as first visit */
    }

    if (prefersReduced || alreadyAnimated) {
      // Already in final state (see initial useState values). No-op.
      return;
    }

    // First visit: wipe the SSR-rendered text and type it out.
    setTypedManifesto("");
    setManifestoDone(false);
    setCaretOn(true);

    let i = 0;
    const interval = window.setInterval(() => {
      i += 1;
      setTypedManifesto(MANIFESTO.slice(0, i));
      if (i >= MANIFESTO.length) {
        window.clearInterval(interval);
        setManifestoDone(true);
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* ignore */
        }
      }
    }, 1000 / MANIFESTO_CPS);

    return () => window.clearInterval(interval);
  }, []);

  // ---- Stop caret blinking 3s after manifesto finishes typing ----
  useEffect(() => {
    if (!manifestoDone || !caretOn) return;
    const id = window.setTimeout(() => setCaretOn(false), CARET_STOP_AFTER_DONE_MS);
    return () => window.clearTimeout(id);
  }, [manifestoDone, caretOn]);

  // ---- Stream the agent response once `submitted` flips to true ----
  useEffect(() => {
    if (!submitted) return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setTypedResponse(AGENT_RESPONSE);
      setResponseDone(true);
      return;
    }

    let i = 0;
    const interval = window.setInterval(() => {
      i += 1;
      setTypedResponse(AGENT_RESPONSE.slice(0, i));
      if (i >= AGENT_RESPONSE.length) {
        window.clearInterval(interval);
        setResponseDone(true);
      }
    }, 1000 / RESPONSE_CPS);

    return () => window.clearInterval(interval);
  }, [submitted]);

  function startFadeToResponse() {
    setFading(true);
    window.setTimeout(() => {
      setSubmitted(true);
      setFading(false);
    }, FADE_MS);
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startFadeToResponse();
  }

  function handleChipClick(text: string) {
    setInputValue(text);
    startFadeToResponse();
  }

  function handleAskAnother() {
    setSubmitted(false);
    setInputValue("");
    setTypedResponse("");
    setResponseDone(false);
    // Drop focus back in the input once it re-mounts
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        {/* 1. Working note pill */}
        <div className={styles.pill}>
          <span className={styles.dot} aria-hidden="true" />
          <span>A working note, ongoing</span>
        </div>

        {/* 2. Manifesto */}
        <h1 className={styles.manifesto}>
          {typedManifesto}
          {caretOn && <span className={styles.caret} aria-hidden="true" />}
        </h1>

        {/* 3. Identity */}
        <p className={styles.identity}>
          Priyank Sharma — Design leader, 23 years, healthcare at enterprise scale. Currently in Gurgaon.
        </p>

        {/* 4. Primary CTA */}
        <a href="/thinking" className={styles.cta}>
          The writing
          <span className={styles.ctaArrow} aria-hidden="true">→</span>
        </a>

        {/* 5. Hairline — hover-reactive */}
        <div
          ref={lineWrapRef}
          className={styles.hairlineWrap}
          onMouseMove={handleLineMove}
          onMouseLeave={handleLineLeave}
          aria-hidden="true"
        >
          <svg className={styles.hairlineSvg} preserveAspectRatio="none">
            <path
              ref={pathRef}
              d="M 0 15 Q 0 15 0 15"
              pathLength="1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* 6. Agent label */}
        <div className={styles.agentLabel}>Or ask the agent</div>

        {/* 7 + 8. Input + chips, OR response */}
        {!submitted ? (
          <div
            className={fading ? `${styles.agentForm} ${styles.agentFormFading}` : styles.agentForm}
          >
            <form onSubmit={handleFormSubmit} className={styles.inputWrap}>
              <label htmlFor="hero-agent-input" className="sr-only" style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 }}>
                Ask the agent
              </label>
              <input
                id="hero-agent-input"
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me how I'd build an AI-native design team"
                className={styles.input}
                autoComplete="off"
              />
              <button type="submit" className={styles.submitBtn} aria-label="Ask">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </button>
            </form>
            <div className={styles.chips}>
              {SUGGESTIONS.map((text) => (
                <button
                  key={text}
                  type="button"
                  onClick={() => handleChipClick(text)}
                  className={styles.chip}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <p className={styles.response}>{typedResponse}</p>
            {responseDone && (
              <button type="button" onClick={handleAskAnother} className={styles.askAnother}>
                Ask another
                <span className={styles.askAnotherArrow} aria-hidden="true">→</span>
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
