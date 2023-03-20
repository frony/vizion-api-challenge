export class ReferenceAddedEvent {
  constructor(
    public readonly referenceId: number,
    public readonly url: string,
  ) {}
}
