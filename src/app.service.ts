import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ReferenceAddedEvent } from './events/reference-added-event';

const EVENT_REFERENCE_ADDED = 'reference_added';
const EVENT_URL_SCRAPED = 'url_scraped';
const EVENT_RESULT_ADDED = 'result_added';

@Injectable()
export class AppService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }

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
