import { getModelForClass, prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

import { PaymentStatusEnum, PaymentTypeEnum } from './payment.enum'

export class Payment {
  readonly _id!: ObjectId

  @prop({ type: Number, required: true })
  public amount!: number

  @prop({ type: String, required: true, default: 'BRL' })
  public currency!: string

  @prop({
    type: String,
    enum: PaymentTypeEnum,
    required: true,
    default: PaymentTypeEnum.CASH
  })
  public type!: PaymentTypeEnum

  @prop({
    type: String,
    enum: PaymentStatusEnum,
    required: true,
    default: PaymentStatusEnum.PENDING,
  })
  public status!: PaymentStatusEnum

  @prop({ type: Date, required: true, default: Date.now })
  public createdAt!: Date
}

export const PaymentModel = getModelForClass(Payment)
