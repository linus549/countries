import { breakpoints } from "../config";

const rootElement = document.querySelector(".dialog");
const panelElement = document.querySelector(".dialog__panel");
const closeElement = document.querySelector(".dialog__close");
const titleElement = document.querySelector(".dialog__title");
const statusElement = document.querySelector(".dialog__status");
const noteElement = document.querySelector(".dialog__note");
const retryElement = document.querySelector(".dialog__btn-retry");
const dismissElement = document.querySelector(".dialog__btn-dismiss");
const mediaQueryList = window.matchMedia(
  `(max-width: ${breakpoints.SMALL_SUB})`
);

let focusEndElement = mediaQueryList.matches ? dismissElement : closeElement;

rootElement.addEventListener("click", handleBackgroundClick);
panelElement.addEventListener("transitionend", handleTransitionEnd);
panelElement.addEventListener("keydown", handlePanelKeyDown);
closeElement.addEventListener("click", close);
dismissElement.addEventListener("click", close);
mediaQueryList.addEventListener("change", handleMediaQueryChange);

export function addRetryClickHandler(handler) {
  retryElement.addEventListener("click", handler);
}

export function addCloseHandler(handler) {
  closeElement.addEventListener("click", handler);
  dismissElement.addEventListener("click", handler);
}

export function update(errorMessage) {
  titleElement.textContent = errorMessage.title;
  statusElement.textContent = errorMessage.status;
  noteElement.innerHTML = errorMessage.htmlNote;
}

export function show() {
  document.addEventListener("keydown", handleDocumentKeyDown);
  rootElement.classList.add("dialog--show");
  panelElement.classList.add("dialog__panel--show");
  retryElement.focus();
}

export function close() {
  document.removeEventListener("keydown", handleDocumentKeyDown);
  rootElement.classList.remove("dialog--show");
  panelElement.classList.remove("dialog__panel--show");
}

function handleBackgroundClick(e) {
  if (e.currentTarget !== e.target) {
    return;
  }

  closeElement.click();
}

function handleTransitionEnd(e) {
  if (e.target.classList.contains("dialog__panel--show")) {
    retryElement.focus();
  }
}

function handleDocumentKeyDown(e) {
  if (e.key === "Escape") {
    closeElement.click();
  }
}

function handlePanelKeyDown(e) {
  if (e.key === "Tab") {
    if (e.shiftKey) {
      if (document.activeElement === retryElement) {
        e.preventDefault();
        focusEndElement.focus();
      }
    } else {
      if (document.activeElement === focusEndElement) {
        e.preventDefault();
        retryElement.focus();
      }
    }
  }
}

function handleMediaQueryChange(e) {
  if (e.matches) {
    focusEndElement = dismissElement;

    if (document.activeElement === closeElement) {
      focusEndElement.focus();
    }
  } else {
    focusEndElement = closeElement;
  }
}
