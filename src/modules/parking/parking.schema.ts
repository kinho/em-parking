import { ObjectId } from 'mongodb'
import { GateEvent } from '@modules/gate-event/gate-event.schema'
import { getNextSequence } from '../utils/sequence.schema'
import { getModelForClass, Pre, prop, Ref } from '@typegoose/typegoose'
import { Payment } from '@modules/payment/payment.schema'

@Pre<Parking>('save', async function () {
  if (this.isNew) this.number = await getNextSequence(Parking.name)
})
export class Parking {
  readonly _id!: ObjectId

  @prop({ type: String, unique: true })
  public number!: string

  @prop({ type: String, required: true })
  public plate!: string

  @prop({ type: Boolean, default: false })
  public exited!: boolean

  @prop({ type: Date, required: false })
  public exitedAt?: Date

  @prop({ type: Boolean, default: false })
  public paid!: boolean

  @prop({ ref: () => Payment, type: () => [Payment], default: [] })
  public payments!: Ref<Payment>[]

  @prop({ ref: () => GateEvent, type: () => [GateEvent], default: [] })
  public gateEvents!: Ref<GateEvent>[]

  @prop({ type: Date, required: true, default: Date.now })
  public updatedAt!: Date

  @prop({ type: Date, required: true, default: Date.now })
  public createdAt!: Date
}

export const ParkingModel = getModelForClass(Parking)
