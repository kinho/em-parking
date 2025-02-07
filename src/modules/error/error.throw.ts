import { ERRORS } from './error.const'

type ErrorCode = keyof typeof ERRORS

export const throwError = (code: ErrorCode): never => {
  throw new Error(`${code}: ${ERRORS[code].message}`)
}
