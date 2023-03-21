import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OnEvent } from '@nestjs/event-emitter';
// import { Op } from 'sequelize';
import puppeteer from 'puppeteer';
import { Result } from './result.model';
import { ReferenceType } from '../dto/reference-type';
import { ResultInput } from '../dto/result-types';
// import { Reference } from '../reference/reference.model';
import { isValidUrl } from '../util/helpers';
import { EVENT_REFERENCE_ADDED, INSERT_RESULT_ERROR } from '../constants';

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
    if (isValidUrl(url)) {
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));
      const data = await this.scrapePage(url);
      const resultInput: ResultInput = {
        reference_id: Number(id),
        data,
      };
      await this.insertResult(resultInput);
    }
  }

  private async scrapePage(url: string) {
    const browser = await puppeteer.launch({ headless: true });
    try {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'load' });
      const title = await page.$eval('head > title', (e) => e.textContent);
      const meta = await page.evaluate(() =>
        Array.from(document.querySelectorAll('meta'), (e) => {
          return {
            name: e.name,
            value: e.content,
          };
        }),
      );
      await browser.close();
      return {
        title,
        meta,
      };
    } catch (error) {
      await browser.close();
      throw new BadRequestException(error.message);
    }
  }

  private async insertResult(payload: ResultInput) {
    try {
      await this.resultModel.create({
        reference_id: payload.reference_id,
        data: payload.data,
      });
    } catch (error) {
      throw new BadRequestException(INSERT_RESULT_ERROR);
    }
  }
}
