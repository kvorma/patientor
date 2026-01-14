import axios from "axios";
import { Dayjs } from 'dayjs';
// eslint-disable-next-line
export function hasOwnProperty<X extends {}, Y extends PropertyKey>
  (obj: X, prop: Y): obj is X & Record<Y, unknown> {
  // eslint-disable-next-line
  return obj.hasOwnProperty(prop)
}
export function hasString(obj: unknown, member: string): string | null {
  return (typeof obj === 'string' && hasOwnProperty(obj, member) && typeof obj.member === 'string')
    ? obj.member
    : null;
}

export const myError = (err: unknown): string => {
  let msg = '';
  if (axios.isAxiosError(err)) {
    msg = err.message;
    if (err.response) {
      msg += ': ' + err.response.data;
    } else if (err.request) {
      console.error('Request:', err.request);
    } else {
      msg = err.message ? err.message : 'Error: unknown Axios error';
    }
  } else {
    msg = hasString(err, 'message') || 'Unknown error';
  }
  console.error('myerror(): ', msg);
  return msg;
};

export const dayjs2iso = (date: Dayjs | null): string => {
  if (!date) {
    throw new Error('internal error - null date object');
  }
  return date?.format('YYYY-MM-DD');
};