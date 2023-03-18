export class ReferenceAddedEvent {
  constructor(
    public readonly referenceId: string,
    public readonly url: string,
  ) {}
}
