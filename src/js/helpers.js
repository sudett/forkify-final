import { TIMEOUT } from "./config";

const timeout = (s) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} seconds.`));
    }, s * 1000);
  });
};

export const getJSON = async (url) => {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT)]);
    const data = await res.json();

    if (res.status !== 200) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};
