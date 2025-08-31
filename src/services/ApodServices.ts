// src/services/ApodServices.ts
export interface ApodResponse {
  title: string;
  url: string;
  explanation: string;
  copyright?: string;
  media_type: "image" | "video";
}

/**
 * Fetch a single APOD from backend
 */
export const fetchApod = async (date?: string): Promise<ApodResponse | null> => {
  let url = "http://localhost:5000/api/apod";
  if (date) url += `?date=${date}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch APOD data");

  const data = await res.json();
  // ✅ double-check media type
  if (!data || data.media_type !== "image") return null;
  return data;
};

/**
 * Fetch multiple APODs from backend
 */
export const fetchMultipleApod = async (count: number): Promise<ApodResponse[]> => {
  const safeCount = Math.min(count, 100);
  const res = await fetch(`http://localhost:5000/api/apod?count=${safeCount}`);
  if (!res.ok) throw new Error("Failed to fetch multiple APODs");

  const data = await res.json();
  // ✅ filter again in case backend missed something
  return data.filter((item: ApodResponse) => item.media_type === "image");
};
