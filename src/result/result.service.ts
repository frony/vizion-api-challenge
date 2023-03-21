import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OnEvent } from '@nestjs/event-emitter';
import { Op } from 'sequelize';
import puppeteer from 'puppeteer';
import { Result } from './result.model';
import { ReferenceType } from '../dto/reference-type';
import { ResultInput } from '../dto/result-types';
import { Reference } from '../reference/reference.model';
import { isValidUrl } from '../util/helpers';
import { EVENT_REFERENCE_ADDED, INSERT_RESULT_ERROR } from '../constants';

@Injectable()
export class ResultService {
  constructor(
    @InjectModel(Result)
    private readonly resultModel: typeof Result,
  ) {}

  /**
   * Find all results related to a URL
   * @param {string} refId
   */
  async getResult(refId: string) {
    try {
      const result = await Result.findAll({
        where: {
          reference_id: { [Op.eq]: refId },
        },
        include: [
          {
            model: Reference,
            attributes: ['url'],
            where: {
              id: { [Op.eq]: refId },
            },
          },
        ],
      });
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Load page from URL, get metadata and insert into Result
   * @param payload
   */
  @OnEvent(EVENT_REFERENCE_ADDED, { async: true })
  async createResult(payload: ReferenceType) {
    const { id, url } = payload;
    if (isValidUrl(url)) {
      try {
        const data = await this.scrapePage(url);
        const resultInput: ResultInput = {
          reference_id: Number(id),
          data,
        };
        await this.insertResult(resultInput);
      } catch (error) {
        return error;
      }
    }
  }

  /**
   * Load page via puppeteer and return title and metadata
   * @param {string} url
   * @private
   */
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

  /**
   * Insert Reference, title and metadata into Result table
   * @param {ResultInput} payload
   * @private
   */
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
