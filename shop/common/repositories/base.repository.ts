import { Entity } from '@shop/common/entities';

export abstract class Repository<E extends Entity> {
  protected entries: Record<string, E> = {};

  /**
   * Finds a given entity based on a provided id
   * @param id - The id of the entity to find
   * @returns The entity if found, otherwise undefined
   */
  public findByID(id: string): E | undefined {
    return this.entries[id];
  }

  /**
   * Saves a single entity within the repository entries
   * @param entity - An instance of the entity to save
   * @returns The saved entity
   */
  public save(entity: E): E {
    const id = entity.id.toString();
    this.entries[id] = entity;

    return entity;
  }
}
