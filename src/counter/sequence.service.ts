import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counter } from './counter.schema';

@Injectable()
export class SequenceService {
  constructor(
    @InjectModel(Counter.name) private counterModel: Model<Counter>,
  ) {}

  async getNextSequenceValue(collectionName: string): Promise<number> {
    const sequenceDocument = await this.counterModel.findOneAndUpdate(
      { collectionName },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );
    return sequenceDocument.seq;
  }
}
