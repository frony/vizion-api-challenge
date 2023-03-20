import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { isEmpty } from 'lodash';
import { Reference } from './reference.model';
import { EVENT_REFERENCE_ADDED } from '../../constants';
import { ReferenceType } from '../../dto/reference-type';

@Injectable()
export class ReferenceService {
  constructor(
    @InjectModel(Reference)
    private readonly referenceModel: typeof Reference,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createReference(urlReference: string) {
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
      throw new BadRequestException('Could not insert URL into the database');
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
