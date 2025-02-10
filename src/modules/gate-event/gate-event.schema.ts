import { getModelForClass, prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

import { GateEventTypeEnum } from './gate-event.enum'

export class GateEvent {
  readonly _id!: ObjectId

  @prop({ type: String, required: true })
  public plate!: string

  @prop({
    type: String,
    enum: GateEventTypeEnum,
    required: true,
  })
  public type!: GateEventTypeEnum

  @prop({ type: Date, required: true, default: Date.now })
  public createdAt!: Date
}

export const GateEventModel = getModelForClass(GateEvent)
