import { timer, fetchAlpha2Code } from "./helpers";
import {
  ResponseNotOkError,
  NoCountryFoundError,
  APIBusyError,
} from "./errors";
import * as autocompleteView from "./views/autocompleteView";
import * as countryView from "./views/countryView";
import * as dialogView from "./views/dialogView";
import * as helpView from "./views/helpView";
import * as loaderView from "./views/loaderView";
import * as mapView from "./views/mapView";
import * as overlayView from "./views/overlayView";
import * as tabsView from "./views/tabsView";
import state, { setCountryByCode, resetErrorMessage } from "./model";
import {
  LOADER_MIN_DURATION,
  MAX_FETCH_ATTEMPTS,
  FETCH_AUTO_ATTEMPT_DELAY,
  INFO_TAB_INDEX,
  errorMessage,
} from "./config";

function init() {
  dialogView.addRetryClickHandler(handleDialogRetryClick);
  dialogView.addCloseHandler(handleDialogClose);
  mapView.addMapClickHandler(handleMapClick);
  autocompleteView.addResultsClickHandler(handleAutocompleteResultsClick);
  tabsView.addTabClickHandler(handleTabClick);
}

function handleAutocompleteResultsClick(e) {
  controlCountry(e.target.dataset.code);
}

function handleDialogRetryClick() {
  dialogView.close();
  controlFetchData();
}

function handleDialogClose() {
  overlayView.hide();
}

function handleMapClick(e) {
  state.mapClickLatlng = e.latlng;
  controlFetchData();
}

function handleTabClick() {
  autocompleteView.closeResults();
}

function controlCountry(alpha2Code) {
  setCountryByCode(alpha2Code);
  helpView.hide();
  autocompleteView.closeResults();
  countryView.update(state.country);
  mapView.placeMarker(state.country.latlng);
}

async function controlFetchData() {
  loaderView.update(state.currentFetchAttempt);
  loaderView.show();
  overlayView.show();
  const loaderTimer = timer(LOADER_MIN_DURATION);

  try {
    const alpha2Code = await fetchAlpha2Code(state.mapClickLatlng);
    await loaderTimer;
    controlCountry(alpha2Code);
    loaderView.close();
    overlayView.hide();
    tabsView.switchTab(INFO_TAB_INDEX);
  } catch (error) {
    resetErrorMessage();

    if (error instanceof ResponseNotOkError) {
      state.errorMessage.status = `${error.response.status} ${error.response.statusText}`;
    } else if (error instanceof APIBusyError) {
      // wait and try again
      if (state.currentFetchAttempt < MAX_FETCH_ATTEMPTS) {
        state.currentFetchAttempt++;
        setTimeout(controlFetchData, FETCH_AUTO_ATTEMPT_DELAY);
        return;
      } else {
        state.errorMessage = { ...errorMessage.BUSY };
      }
    } else if (error instanceof NoCountryFoundError) {
      state.errorMessage = {
        ...errorMessage.NO_COUNTRY_FOUND,
        status: `No country was found at latitude ${state.mapClickLatlng.lat.toFixed(
          1
        )}, longitude ${state.mapClickLatlng.lng.toFixed(1)}.`,
      };
    } else {
      state.errorMessage.status = error.message;
    }

    await loaderTimer;
    loaderView.close();
    dialogView.update(state.errorMessage);
    dialogView.show();
  }

  state.currentFetchAttempt = 1;
}

init();
