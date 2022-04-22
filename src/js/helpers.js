import { TIMEOUT } from "./config";

const timeout = (s) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} seconds.`));
    }, s * 1000);
  });
};

export const AJAXCall = async (url, uploadData = undefined) => {
  try {
    const fetchFunc = !uploadData
      ? fetch(url)
      : fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        });

    const res = await Promise.race([fetchFunc, timeout(TIMEOUT)]);
    const data = await res.json();

    if (res.ok !== true) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};

// export const getJSON = async (url) => {
//   try {
//     const res = await Promise.race([fetch(url), timeout(TIMEOUT)]);
//     const data = await res.json();

//     if (res.ok !== true) throw new Error(`${data.message} (${res.status})`);

//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const sendJSON = async (url, uploadData) => {
//   try {
//     const res = await Promise.race([
//       fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(uploadData),
//       }),
//       timeout(TIMEOUT),
//     ]);

//     const data = await res.json();

//     if (res.ok !== true) throw new Error(`${data.message} (${res.status})`);

//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
