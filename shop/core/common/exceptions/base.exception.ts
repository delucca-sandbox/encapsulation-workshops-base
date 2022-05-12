export abstract class Exception extends Error {
  public abstract readonly code: string;

  protected constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}
