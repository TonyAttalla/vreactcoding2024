import { atom } from "jotai";

export const booksAtom = atom([]);
export const loadingAtom = atom(true);
export const errorAtom = atom(null);
export const deleteModalOpenAtom = atom(false);
export const bookIdToDeleteAtom = atom(null);
