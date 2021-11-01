import axios from 'axios';
import { API_KEY, BOOK_PER_PAGE, TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url, query, page) {
  try {
    const axiosPro = await axios(url, {
      method: 'GET',
      params: {
        query: query,
        page: page,
        size: BOOK_PER_PAGE,
      },
      headers: {
        Authorization: `KakaoAK ${API_KEY}`,
      },
    });
    const res = await Promise.race([axiosPro, timeout(TIMEOUT_SEC)]);
    if (res.status !== 200) throw new Error(`${res.statusText} ${res.status}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
