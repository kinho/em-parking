import { MaxLength, MinLength } from 'class-validator'
import { Expose } from 'class-transformer'
import { 
  STRING_MAX_LENGTH, 
  STRING_MIN_LENGTH,
} from '@modules/utils/validation.default'

export class EntryParkingArgs {
  @Expose()
  @MinLength(STRING_MIN_LENGTH)
  @MaxLength(STRING_MAX_LENGTH)
  plate!: string
}
