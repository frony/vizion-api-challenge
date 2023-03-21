import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { isEmpty } from 'lodash';
import { Reference } from './reference.model';
import { ReferenceType } from '../dto/reference-type';
import { isValidUrl } from '../util/helpers';
import { EVENT_REFERENCE_ADDED, INSERT_REFERENCE_ERROR } from '../constants';

@Injectable()
export class ReferenceService {
  constructor(
    @InjectModel(Reference)
    private readonly referenceModel: typeof Reference,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createReference(urlReference: string) {
    if (!isValidUrl(urlReference)) {
      throw new BadRequestException(
        'URL is not valid. Make sure the URL starts with http:// or https://',
      );
    }
    const referenceArr = await this.findReference(urlReference);
    let reference = referenceArr[0];
    if (isEmpty(reference)) {
      reference = await this.insertReference(urlReference);
    }
    const { id, url, created_at } = reference;
    const payload: ReferenceType = {
      id,
      url,
      created_at: created_at.toString(),
    };
    this.eventEmitter.emit(EVENT_REFERENCE_ADDED, payload);
    return reference;
  }

  private async insertReference(urlReference: string) {
    try {
      const reference = await this.referenceModel.create({
        url: urlReference,
      });
      return reference;
    } catch (error) {
      throw new BadRequestException(INSERT_REFERENCE_ERROR);
    }
  }

  private async findReference(urlReference: string): Promise<Reference[]> {
    const reference = await this.referenceModel.findAll({
      limit: 1,
      where: {
        url: urlReference,
      },
    });

    return reference;
  }
}
