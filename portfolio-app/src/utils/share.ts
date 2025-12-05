export type SharePayload<T> = {
  version: number;
  timestamp: number;
  data: T;
};

export const encodeSharePayload = <T>(data: T) => {
  try {
    const payload: SharePayload<T> = {
      version: 1,
      timestamp: Date.now(),
      data,
    };
    const json = JSON.stringify(payload);
    
    // Use URL-safe base64 encoding
    if (typeof window === "undefined") {
      // Server-side
      return Buffer.from(json).toString("base64url");
    } else {
      // Client-side
      return btoa(encodeURIComponent(json))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    }
  } catch (error) {
    console.error("Encoding error:", error);
    throw new Error("Failed to encode data");
  }
};

export const decodeSharePayload = <T>(encoded: string): SharePayload<T> => {
  try {
    let json: string;
    
    if (typeof window === "undefined") {
      // Server-side
      json = Buffer.from(encoded, "base64url").toString();
    } else {
      // Client-side - reverse the URL-safe encoding
      let base64 = encoded
        .replace(/-/g, '+')
        .replace(/_/g, '/');
      
      // Add padding if needed
      while (base64.length % 4) {
        base64 += '=';
      }
      
      json = decodeURIComponent(atob(base64));
    }
    
    return JSON.parse(json) as SharePayload<T>;
  } catch (error) {
    console.error("Decoding error:", error);
    throw new Error("Invalid share payload");
  }
};

export const buildShareUrl = (
  path: string,
  encodedPayload: string,
  extraParams?: Record<string, string>
) => {
  try {
    const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    const url = new URL(path, origin);
    url.searchParams.set("data", encodedPayload);
    
    if (extraParams) {
      Object.entries(extraParams).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }
    
    return url.toString();
  } catch (error) {
    console.error("URL building error:", error);
    throw new Error("Failed to create share link");
  }
};