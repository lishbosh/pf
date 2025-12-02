export type SharePayload<T> = {
  version: number;
  timestamp: number;
  data: T;
};

export const encodeSharePayload = <T>(data: T) => {
  const payload: SharePayload<T> = {
    version: 1,
    timestamp: Date.now(),
    data,
  };
  const json = JSON.stringify(payload);
  return typeof window === "undefined"
    ? Buffer.from(json).toString("base64url")
    : btoa(json);
};

export const decodeSharePayload = <T>(encoded: string): SharePayload<T> => {
  const decoded =
    typeof window === "undefined"
      ? Buffer.from(encoded, "base64url").toString()
      : atob(encoded);
  return JSON.parse(decoded) as SharePayload<T>;
};

export const buildShareUrl = (
  path: string,
  encodedPayload: string,
  extraParams?: Record<string, string>
) => {
  if (typeof window === "undefined") return encodedPayload;
  const origin = window.location.origin;
  const url = new URL(path, origin);
  url.searchParams.set("data", encodedPayload);
  if (extraParams) {
    Object.entries(extraParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  return url.toString();
};

