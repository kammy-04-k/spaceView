// nasaApi.js
import fetch from "node-fetch";

export async function fetchApod({ date, count }) {
  let url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`;

  if (date) {
    url += `&date=${date}`;
  } else if (count) {
    url += `&count=${count}`;
  }

  console.log("Calling NASA with:", url);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`NASA API error: ${res.statusText}`);

  const data = await res.json();
  const results = Array.isArray(data) ? data : [data];

  //   filter only images
  const imagesOnly = results.filter((item) => item.media_type === "image");

  // if no images found, return null (frontend will handle it)
  return count ? imagesOnly : imagesOnly[0] || null;
}
