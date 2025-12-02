import { nanoid } from "nanoid";
import { get, set } from "idb-keyval";

export const saveImageToIndexedDB = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const blob = new Blob([arrayBuffer], { type: file.type });
  const id = `photo-${nanoid()}`;
  await set(id, blob);
  return id;
};

export const loadImageUrl = async (id?: string) => {
  if (!id) return undefined;
  const blob = await get<Blob>(id);
  if (!blob) return undefined;
  return URL.createObjectURL(blob);
};

