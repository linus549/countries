import { showElements, hideElements } from "../helpers";

const rootElement = document.querySelector(".help");

export function show() {
  showElements(rootElement);
}

export function hide() {
  hideElements(rootElement);
}
