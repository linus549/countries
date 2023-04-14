import { breakpoints } from "../config";

const tabPanelsElement = document.querySelector(".tabs__tab-panels");
const tabPanelElements = [...document.querySelectorAll(".tabs__tab-panel")];
const tabListElement = document.querySelector(".tabs__tab-list");
const tabElements = document.querySelectorAll(".tabs__tab");
const mediaQueryList = window.matchMedia(
  `(max-width: ${breakpoints.LARGE_SUB})`
);

const observer = new IntersectionObserver(handleTabPanelIntersection, {
  root: tabPanelsElement,
  threshold: 0.5,
});

if (mediaQueryList.matches) {
  observeTabPanels();
}

tabListElement.addEventListener("click", handleTabListClick);
mediaQueryList.addEventListener("change", handleMediaQueryChange);

export function addTabClickHandler(handler) {
  tabListElement.addEventListener("click", (e) => {
    if (e.target.nodeName !== "BUTTON") {
      return;
    }

    handler(e);
  });
}

export function switchTab(index) {
  setActiveTab(index);

  const tabPanel = tabPanelElements.find(
    (element) => Number(element.dataset.tabsIndex) === Number(index)
  );

  if (tabPanel) {
    tabPanel.scrollIntoView();
  }
}

function handleTabListClick(e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }

  const index = e.target.dataset.tabsIndex;
  switchTab(index);
}

function handleMediaQueryChange(e) {
  if (e.matches) {
    observeTabPanels();
    switchTab(0);
  } else {
    observer.disconnect();
  }
}

function handleTabPanelIntersection(observations) {
  for (const observation of observations) {
    if (observation.isIntersecting) {
      const index = observation.target.dataset.tabsIndex;
      setActiveTab(index);
    }
  }
}

function observeTabPanels() {
  for (const tabPanel of tabPanelElements) {
    observer.observe(tabPanel);
  }
}

function setActiveTab(index) {
  for (const tab of tabElements) {
    if (Number(tab.dataset.tabsIndex) === Number(index)) {
      tab.classList.add("tabs__tab--active");
    } else {
      tab.classList.remove("tabs__tab--active");
    }
  }
}
