export const TILES_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
export const ATTRIBUTION = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`;
export const LOADER_MIN_DURATION = 1000;
export const FETCH_TIMEOUT = 10000;
export const FETCH_AUTO_ATTEMPT_DELAY = 1000;
export const MAX_FETCH_ATTEMPTS = 8;
export const INFO_TAB_INDEX = 0;

export const errorMessage = {
  DEFAULT: {
    title: "Unable to Fetch Data",
    status: "",
    htmlNote: "",
  },

  BUSY: {
    title: "Geocode API Server Busy",
    status: "",
    htmlNote: `<p>The Geocode API server used for map clicks may be busy.</p>
    <p>You can also use the search field to list countries.</p>`,
  },

  NO_COUNTRY_FOUND: {
    title: "No Country Found",
    status: "",
    htmlNote:
      "<p>If this error incorrectly persists, try reloading the page.</p>",
  },
};

export const breakpoints = {
  SMALL_SUB: "575.98px",
  SMALL: "576px",
  LARGE_SUB: "991.98px",
  LARGE: "992px",
};
