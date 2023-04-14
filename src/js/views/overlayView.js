const rootElement = document.querySelector(".overlay");
const backdropElement = document.querySelector(".overlay__backdrop");

export function show() {
  rootElement.classList.add("overlay--show");
  backdropElement.classList.add("overlay__backdrop--show");
}

export function hide() {
  rootElement.classList.remove("overlay--show");
  backdropElement.classList.remove("overlay__backdrop--show");
}
