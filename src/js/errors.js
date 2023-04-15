export class ResponseNotOkError extends Error {
  constructor(response) {
    super();
    this.name = "ResponseNotOkError";
    this.response = response;
  }
}

export class APIBusyError extends Error {
  constructor() {
    super();
    this.name = "APIBusyError";
  }
}

export class NoCountryFoundError extends Error {
  constructor() {
    super();
    this.name = "NoCountryFoundError";
  }
}
