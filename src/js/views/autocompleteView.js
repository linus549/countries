import { showElements, hideElements } from "../helpers";
import countries from "../../countries.json";

const inputElement = document.querySelector(".autocomplete__input");
const closeElement = document.querySelector(".autocomplete__close");
const resultsElement = document.querySelector(".autocomplete__results");
const fragment = new DocumentFragment();
let results = [];
let selection;
let selectionIndex;

inputElement.addEventListener("focus", handleInput);
inputElement.addEventListener("input", handleInput);
inputElement.addEventListener("keydown", handleKeydown);
closeElement.addEventListener("click", closeResults);
resultsElement.addEventListener("click", closeResults);

export function addResultsClickHandler(handler) {
  resultsElement.addEventListener("click", handler);
}

export function closeResults() {
  hideElements(closeElement, resultsElement);
}

function handleInput() {
  results = countries.filter(({ normalizedName }) =>
    normalizedName.includes(inputElement.value.toLowerCase().trim())
  );

  results.sort(compareNormalizedName);
  updateResults();
}

function handleKeydown(e) {
  if (e.key === "ArrowDown") {
    e.preventDefault();

    if (selectionIndex < resultsElement.childElementCount - 1) {
      selectionIndex++;
      selectResult(selectionIndex, selectionIndex - 1);
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();

    if (selectionIndex > 0) {
      selectionIndex--;
      selectResult(selectionIndex, selectionIndex + 1);
    }
  } else if (e.key === "Enter") {
    if (selection) {
      selection.click();
      inputElement.blur();
    }
  } else if (e.key === "Tab") {
    closeResults();
  } else if (e.key === "Escape") {
    closeResults();
    inputElement.blur();
  }
}

function selectResult(currentIndex, prevIndex) {
  const current = resultsElement.children[currentIndex];
  const prev = resultsElement.children[prevIndex];

  selection = current;
  current.classList.add("autocomplete__result--selected");
  current.scrollIntoView({ block: "nearest" });

  if (prev !== undefined) {
    prev.classList.remove("autocomplete__result--selected");
  }
}

function updateResults() {
  if (results.length === 0) {
    closeResults();
    selection = null;
    return;
  }

  for (const result of results) {
    const listItem = document.createElement("li");
    listItem.textContent = result.name;
    listItem.dataset.code = result.alpha2Code;
    listItem.classList.add("autocomplete__result");
    fragment.append(listItem);
  }

  resultsElement.replaceChildren(fragment);
  showElements(closeElement, resultsElement);
  selectionIndex = 0;
  selectResult(selectionIndex);
}

function compareNormalizedName(a, b) {
  if (a.normalizedName < b.normalizedName) {
    return -1;
  } else if (a.normalizedName > b.normalizedName) {
    return 1;
  }

  return 0;
}
