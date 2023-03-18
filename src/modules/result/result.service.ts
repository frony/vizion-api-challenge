import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ReferenceAddedEvent } from '../../events/reference-added-event';

const EVENT_REFERENCE_ADDED = 'reference_added';

@Injectable()
export class ResultService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  private readonly logger = new Logger(ResultService.name);

  async getResult(refId: string) {
    this.logger.log('Will get results from DB');
  }

  @OnEvent(EVENT_REFERENCE_ADDED, { async: true })
  async scrapeUrl(payload: ReferenceAddedEvent) {
    const { referenceId, url } = payload;
    this.logger.log(`referenceId: ${referenceId}`);
    this.logger.log(`Scraping the URL ${url}`);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));
    this.logger.log('Preparing JSON');
    const data = {
      title: 'This is a title',
      meta: [
        {
          name: 'one',
          value: '1',
        },
        {
          name: 'two',
          value: '2',
        },
      ],
    };
    this.logger.log('Preparing to save in DB');
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));
    this.logger.log('Saved in DB');
  }
}
