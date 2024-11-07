import { atom } from 'jotai';

export const currentDateAtom = atom(new Date());
export const viewAtom = atom<'week' | 'month'>('month');
export const holidaysAtom = atom<{ [key: string]: string }>({});
export const searchTermAtom = atom('');
