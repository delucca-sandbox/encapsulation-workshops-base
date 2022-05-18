export abstract class Exception<
  M extends Record<string, unknown> | undefined = undefined,
> extends Error {
  public abstract readonly code: string;
  public readonly metadata?: M;

  protected constructor(message: string, metadata?: M) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.metadata = metadata;
  }
}
