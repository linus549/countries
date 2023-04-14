import { ResponseNotOkError, NoCountryFoundError } from "./errors";
import { FETCH_TIMEOUT } from "./config";

export function showElements(...elements) {
  for (const element of elements) {
    element.hidden = false;
  }
}

export function hideElements(...elements) {
  for (const element of elements) {
    element.hidden = true;
  }
}

export function timer(wait) {
  return new Promise((resolve) => setTimeout(resolve, wait));
}

export async function fetchAlpha2Code(latlng) {
  const data = await fetchJSON(
    `https://geocode.xyz/${latlng.lat},${latlng.lng}?json=1`
  );

  if (data.prov === undefined) {
    throw new NoCountryFoundError();
  }

  if (data.prov === "UK") {
    return "GB";
  }

  return data.prov;
}

async function fetchJSON(url, timeout = FETCH_TIMEOUT) {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout);
  const response = await fetch(url, { signal: controller.signal });

  if (!response.ok) {
    throw new ResponseNotOkError(response);
  }

  return await response.json();
}
