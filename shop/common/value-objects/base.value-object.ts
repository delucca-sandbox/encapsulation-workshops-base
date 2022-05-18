import { Primitive } from '@shop/common/types';

type ValueObjectProperties = Record<
  string,
  Primitive | ValueObject<ValueObjectProperties>
>;

export abstract class ValueObject<T extends ValueObjectProperties> {
  protected properties: T;

  protected constructor(properties: T) {
    this.properties = properties;
  }
}
