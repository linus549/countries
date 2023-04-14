import { MAX_FETCH_ATTEMPTS } from "../config";

const rootElement = document.querySelector(".loader");
const panelElement = document.querySelector(".loader__panel");
const maxAttemptsElement = document.querySelector(".loader__max-attempts");
const currentAttemptElement = document.querySelector(
  ".loader__current-attempt"
);

panelElement.addEventListener("transitionend", handleTransitionEnd);
panelElement.addEventListener("keydown", handleKeyDown);
maxAttemptsElement.textContent = MAX_FETCH_ATTEMPTS;

export function update(currentAttempt) {
  currentAttemptElement.textContent = currentAttempt;
}

export function show() {
  rootElement.classList.add("loader--show");
  panelElement.classList.add("loader__panel--show");
  panelElement.focus();
}

export function close() {
  rootElement.classList.remove("loader--show");
  panelElement.classList.remove("loader__panel--show");
}

function handleTransitionEnd(e) {
  if (e.target.classList.contains("loader__panel--show")) {
    panelElement.focus();
  }
}

function handleKeyDown(e) {
  if (e.key === "Tab") {
    e.preventDefault();
  }
}
