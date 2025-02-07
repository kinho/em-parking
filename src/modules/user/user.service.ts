import bcrypt from 'bcrypt'
import { throwError } from "@modules/error"
import { PASSWORD_SALT } from '@modules/utils/validation.default'
import { User, UserModel } from "./user.schema"
import { CreateUserArgs, ListUserArgs, ListUserResponse } from "./user.type"

export const getUser = async (id: string): Promise<User | null> => {
  return UserModel.findById(id)
}

export const listUsers = async (args: ListUserArgs): Promise<ListUserResponse> => {
  const { name, email, offset, limit } = args

  const filter: Record<string, any> = {}

  if (name) filter['name'] = { $eq: name }
  if (email) filter['email'] = { $eq: email }

  const total = await UserModel.countDocuments(filter)
  const data = await UserModel.find(filter).skip(offset).limit(limit)

  return { data, total }
}

export const createUser = async ({ name, email, password, role }: CreateUserArgs): Promise<User> => {
  try {
    const user = new UserModel({
      name,
      email,
      password: await hashPassword(password),
      role: role || 'DEFAULT',
    } as User)

    const saved = await user.save()
    return { ...saved.toJSON(), password: '' }

  } catch (error) {
    return throwError('INTERNAL_ERROR')
  }
}

const hashPassword = async (password: string): Promise<string> => {
  try {
    return bcrypt.hash(password, await bcrypt.genSalt(PASSWORD_SALT))
  } catch (error) {
    return throwError('INTERNAL_ERROR')
  }
}

export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    await UserModel.deleteOne({ _id: id })
    return true
  } catch (error) {
    return throwError('INTERNAL_ERROR')
  }
}
