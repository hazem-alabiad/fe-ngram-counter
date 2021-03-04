const { _URLS } = require("src/constants/urls");

/**
 * @param {Object} requestBody
 * @param {string} requestBody.body
 * @param {boolean} requestBody.case_sensitive
 * @param {string} requestBody.ngram
 * @param {string} requestBody.length
 */
export const apiGetNgramCounts = async (requestBody) => {
  return fetch(_URLS.base + _URLS.getNgramCounts, {
    method: "POST",
    body: JSON.stringify(requestBody),
  })
    .catch((err) => {
      console.error(err);
    })
    .then((res) => res.json());
};
