/**
 * Wrap a callback style function by returning a promise
 * Allow only 2-args callback function (error and result)
 * @param context
 * @param func
 * @param args
 * @return {*}
 */
module.exports = function promiseWrapper(context, func, ...args) {
    if (typeof func !== 'function') {
        return Promise.reject('INVALID_FUNCTION');
    }

    return new Promise((resolve, reject) => {
        func.call(context, ...args, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        })
    })
}