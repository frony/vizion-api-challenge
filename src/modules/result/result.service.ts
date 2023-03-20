import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
// import { ReferenceAddedEvent } from '../../events/reference-added-event';
import { EVENT_REFERENCE_ADDED } from '../../constants';
import { ReferenceType, ReferenceInDbType } from '../../dtp/reference-type';

@Injectable()
export class ResultService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  private readonly logger = new Logger(ResultService.name);

  async getResult(refId: string) {
    this.logger.log(`Will get results from DB for ${refId}`);
  }

  @OnEvent(EVENT_REFERENCE_ADDED, { async: true })
  async scrapeUrl(payload: ReferenceType) {
    const { id, url } = payload;
    this.logger.log(`referenceId: ${id}`);
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
