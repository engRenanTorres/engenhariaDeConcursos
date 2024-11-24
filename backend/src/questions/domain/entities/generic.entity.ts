export abstract class GenericEntity {
  public readonly createdAt?: Date = new Date();
  constructor(public readonly id: number) {}
}
