import {Iterable} from "immutable";
export const UNKNOWN = 'UNKNOWN';
export type Unknown = 'UNKNOWN'

export const identity: any = (val: any) => val;
export const known = (val: any) => val != UNKNOWN;

export const getGuid = (): string =>
  Math.random()
    .toString()
    .slice(2);

export const ONE_SEC_MS: number = 1000;
export const ONE_MIN_MS: number = 60 * ONE_SEC_MS;
export const ONE_HOUR_MS: number = 60 * ONE_MIN_MS;

export const trackById = (index: number, obj: Iterable<any, any>): any =>
    obj.get('id');

export function getSubstrWithoutCuttingWord(str: string, length: number): string {
  let cut= str.indexOf(' ', length);
  if(cut== -1) return str;
  return str.substring(0, cut)
}

export const inputSelectDefaultValue = 'selectMessage';
