import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OnEvent } from '@nestjs/event-emitter';
import { Result } from './result.model';
import { EVENT_REFERENCE_ADDED } from '../../constants';
import { ReferenceType } from '../../dto/reference-type';
import { ResultInput } from '../../dto/result-types';

@Injectable()
export class ResultService {
  constructor(
    @InjectModel(Result)
    private readonly resultModel: typeof Result,
  ) {}

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
    // TODO: Build JSON from scraper
    const resultInput: ResultInput = {
      reference_id: Number(id),
      data: {
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
      },
    };
    await this.insertResult(resultInput);
  }

  private async insertResult(payload: ResultInput) {
    try {
      const result = await this.resultModel.create({
        reference_id: payload.reference_id,
        data: payload.data,
      });
      this.logger.log(result);
      this.logger.log('Saved in DB');
    } catch (error) {
      throw new BadRequestException(
        'Could not insert Result into the database',
      );
    }
  }
}
