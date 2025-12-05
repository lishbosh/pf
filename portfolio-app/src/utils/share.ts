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
  try {
    const decoded =
      typeof window === "undefined"
        ? Buffer.from(encoded, "base64url").toString()
        : atob(encoded);
    return JSON.parse(decoded) as SharePayload<T>;
  } catch (error) {
    console.error("Failed to decode share payload:", error);
    throw new Error("Invalid share payload");
  }
};

export const buildShareUrl = (
  path: string,
  encodedPayload: string,
  extraParams?: Record<string, string>
) => {
  if (typeof window === "undefined") return encodedPayload;
  try {
    const origin = window.location.origin;
    const url = new URL(path, origin);
    url.searchParams.set("data", encodedPayload);
    if (extraParams) {
      Object.entries(extraParams).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }
    return url.toString();
  } catch (error) {
    console.error("Failed to build share URL:", error);
    throw new Error("Failed to create share link");
  }
};