import bcrypt from 'bcrypt'
import { throwError } from "@modules/error"
import { User, UserModel } from "./user.schema"
import { CreateUserArgs, ListUserArgs, ListUserResponse } from "./user.type"

const SALT = 10

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

    return user.save()
  } catch (error) {
    return throwError('INTERNAL_ERROR')
  }
}

const hashPassword = async (password: string): Promise<string> => {
  try {
    return bcrypt.hash(password, await bcrypt.genSalt(SALT))
  } catch (error) {
    return throwError('INTERNAL_ERROR')
  }
}
