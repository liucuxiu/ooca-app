enum errorType {
  NOT_FOUND = 0,
  INVALID_INPUT = 1,
  UNABLE_TO_PERFORM = 2,
  ALREADY_EXISTS = 3
}

export class BaseError extends Error {
  type: errorType;
  reason : string;
  constructor (type: errorType, description: string) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.type = type;
    this.reason = description;
    Error.captureStackTrace(this);
  }

  static notFound(message : string) : Error {
    return new BaseError(errorType.NOT_FOUND, message);
  }
  static unableToPerform(message : string) : Error {
    return new BaseError(errorType.UNABLE_TO_PERFORM, message);
  }
  static invalidInput(message : string) : Error {
    return new BaseError(errorType.INVALID_INPUT, message);
  }
}
