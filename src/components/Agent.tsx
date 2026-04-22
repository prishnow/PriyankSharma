import { useEffect, useRef, useState, type FormEvent } from "react";
import styles from "./Agent.module.css";

interface Props {
  /** Placeholder text shown inside the input */
  placeholder?: string;
  /** The hardcoded response that streams back on submit */
  response?: string;
  /** Optional suggestion chips rendered under the input */
  suggestions?: string[];
}

const DEFAULT_PLACEHOLDER = "Ask me something...";
const DEFAULT_RESPONSE =
  "No response configured. Pass a `response` prop to this Agent instance.";
const RESPONSE_CPS = 30;
const FADE_MS = 200;

export default function Agent({
  placeholder = DEFAULT_PLACEHOLDER,
  response = DEFAULT_RESPONSE,
  suggestions = [],
}: Props) {
  const [inputValue, setInputValue] = useState("");
  const [fading, setFading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [typedResponse, setTypedResponse] = useState("");
  const [responseDone, setResponseDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Stream the response on submit.
  useEffect(() => {
    if (!submitted) return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setTypedResponse(response);
      setResponseDone(true);
      return;
    }

    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTypedResponse(response.slice(0, i));
      if (i >= response.length) {
        window.clearInterval(id);
        setResponseDone(true);
      }
    }, 1000 / RESPONSE_CPS);
    return () => window.clearInterval(id);
  }, [submitted, response]);

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
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }

  return (
    <div className={styles.agent}>
      {!submitted ? (
        <div className={fading ? `${styles.form} ${styles.formFading}` : styles.form}>
          <form onSubmit={handleFormSubmit} className={styles.inputWrap}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholder}
              className={styles.input}
              autoComplete="off"
              aria-label="Ask the agent"
            />
            <button type="submit" className={styles.submitBtn} aria-label="Send">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </form>
          {suggestions.length > 0 && (
            <div className={styles.chips}>
              {suggestions.map((text) => (
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
          )}
        </div>
      ) : (
        <>
          <p className={styles.response}>{typedResponse}</p>
          {responseDone && (
            <button type="button" onClick={handleAskAnother} className={styles.askAnother}>
              Ask another
              <span aria-hidden="true">&nbsp;&rarr;</span>
            </button>
          )}
        </>
      )}
    </div>
  );
}
