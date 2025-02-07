import { IsEmail, IsOptional, MaxLength, MinLength } from 'class-validator'
import { Expose } from 'class-transformer'
import { 
  PASSWORD_MAX_LENGTH, 
  PASSWORD_MIN_LENGTH, 
  STRING_MAX_LENGTH, 
  STRING_MIN_LENGTH,
} from '@modules/utils/validation.default'
import { UserRoleEnum } from './user.enum'
import { User } from './user.schema'

export class CreateUserArgs {
  @Expose()
  @MinLength(STRING_MIN_LENGTH)
  @MaxLength(STRING_MAX_LENGTH)
  name!: string

  @Expose()
  @IsEmail()
  @MinLength(STRING_MIN_LENGTH)
  @MaxLength(STRING_MAX_LENGTH)
  email!: string

  @Expose()
  @MinLength(PASSWORD_MIN_LENGTH)
  @MaxLength(PASSWORD_MAX_LENGTH)
  password!: string

  @Expose()
  @IsOptional()
  role?: UserRoleEnum = UserRoleEnum.DEFAULT
}

export class ListUserArgs {
  @Expose()
  @IsOptional()
  name?: string

  @Expose()
  @IsOptional()
  email?: string

  @Expose()
  @IsOptional()
  offset: number = 0

  @Expose()
  @IsOptional()
  limit: number = 10
}

export class ListUserResponse {
  @Expose()
  total!: number

  @Expose()
  data!: User[]
}
