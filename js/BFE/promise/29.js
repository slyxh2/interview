// 29. implement async helper - `sequence()`

/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void
*/

// use Promise
/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function sequence(funcs) {
    // your code here
    return function (lastCallback, args) {
        let accu = funcs.reduce((prev, curr) => {
            return prev.then(data => {
                return new Promise((resolve, reject) => {
                    curr((err, num) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(num);
                        }
                    }, data);
                })
            })
        }, Promise.resolve(args));
        accu.then(data => lastCallback(undefined, data))
            .catch(err => lastCallback(err));
    }
}

// without promise
function sequence(funcs) {
    // your code here
    return function (lastCallback, args) {
        let idx = 0;
        function cb(error, num) {
            if (error) return lastCallback(error);
            if (idx < funcs.length - 1) {
                return funcs[++idx](cb, num);
            }
            return lastCallback(undefined, num);
        }
        funcs[0](cb, args);
    }
}
