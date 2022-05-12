import { Exception, ValueObject } from '@shop/core/common';
import uuid from 'uuid';

type IDProperties = {
  value?: string;
};

export class ID extends ValueObject<IDProperties> {
  public constructor(properties: IDProperties) {
    super(properties);

    if (!properties.value) this.flush();
    this.validate();
  }

  public toString(): string {
    return this.properties.value;
  }

  private flush(): void {
    this.properties.value = uuid.v4();
  }

  private validate(): void {
    const isValid = uuid.validate(this.properties.value);

    if (!isValid) {
      throw new InvalidIDException(this.properties.value);
    }
  }
}

class InvalidIDException extends Exception {
  public readonly code = 'INVALID_ID';

  public constructor(id: string) {
    super(`The provided ID '${id}' is invalid`);
  }
}
