/**
 * Return a promise that resolve after a said amount of time
 * @param {number} time
 * @param {*} [result] promised value
 * @param {boolean} [reject=false] reject promise if true
 * @returns {Promise}
 */
async function wait(time, result, reject = false) {
  return new Promise((res, rej) => {
    // eslint-disable-next-line no-confusing-arrow
    setTimeout(() => reject ? rej(result) : res(result), time);
  });
}

module.exports = wait;
