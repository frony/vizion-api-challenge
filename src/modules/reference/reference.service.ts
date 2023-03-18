import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ReferenceAddedEvent } from '../../events/reference-added-event';

const EVENT_REFERENCE_ADDED = 'reference_added';

@Injectable()
export class ReferenceService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  private readonly logger = new Logger(ReferenceService.name);

  async insertReference(url: string) {
    this.logger.log('Inserting into reference table');
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
    this.logger.log(
      'Inserted into reference table and emitting EVENT_REFERENCE_ADDED.',
    );
    const id = '1234'; // TODO: Get it from DB insert
    const payload: ReferenceAddedEvent = {
      referenceId: id,
      url,
    };
    this.eventEmitter.emit(EVENT_REFERENCE_ADDED, payload);
    // TODO: return reference from here
    return payload;
  }
}
