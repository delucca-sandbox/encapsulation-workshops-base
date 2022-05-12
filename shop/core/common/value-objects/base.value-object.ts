import { Primitive } from '@shop/core/common';

type ValueObjectProperties = Record<string, Primitive>;

export abstract class ValueObject<T extends ValueObjectProperties> {
  protected properties: T;

  protected constructor(properties: T) {
    this.properties = properties;
  }
}
