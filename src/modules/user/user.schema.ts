import { getModelForClass, prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

import { UserRoleEnum } from '@modules/user/user.enum'

export class User {
  readonly _id!: ObjectId

  @prop({ type: String, required: true })
  public name!: string

  @prop({ type: String, required: true, unique: true })
  public email!: string

  @prop({ type: String, required: true, select: false })
  public password!: string

  @prop({ type: Boolean, default: true })
  public active!: boolean

  @prop({
    type: String,
    enum: UserRoleEnum,
    required: true,
    default: UserRoleEnum.DEFAULT,
  })
  public role?: UserRoleEnum

  @prop({ type: Date, required: true, default: Date.now })
  public createdAt!: Date
}

export const UserModel = getModelForClass(User)
