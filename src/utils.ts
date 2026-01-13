import axios from "axios";

export function hasOwnProperty<X extends {}, Y extends PropertyKey>
  (obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop)
}
export function hasString(obj: unknown, member: string): string | null {
  return (typeof obj === 'string' && hasOwnProperty(obj, member) && typeof obj.member === 'string')
    ? obj.member
    : null
}

export const myError = (err: unknown): string => {
  let msg = ''
  if (axios.isAxiosError(err)) {
    msg = err.message;
    if (err.response) {
      msg += ': ' + err.response.data
    } else if (err.request) {
      console.error('Request:', err.request)
    } else {
      msg = err.message ? err.message : 'Error: unknown Axios error'
    }
  } else {
    msg = hasString(err, 'message') || 'Unknown error'
  }
  console.error('myerror(): ', msg)
  return msg
}