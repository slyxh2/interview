
/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void

*/

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function parallel(funcs) {
    // your code here
    return function (lastCallback, value) {
        let p = new Promise((resolve, reject) => {
            let result = [];
            let count = 0;
            for (let i = 0; i < funcs.length; i++) {
                let fn = funcs[i];
                const cb = (error, data) => {
                    if (error) reject(error);
                    count++;
                    result[i] = data;
                    if (count === funcs.length) resolve(result);
                }
                fn(cb);
            }
        })
        p.then((value) => {
            lastCallback(undefined, value)
        }).catch((error) => {
            lastCallback(error, undefined)
        })
    }
}

function parallel(funcs) {
    // your code here
    return function (lastCallback, num) {
        funcs = funcs.map(fn => {
            return new Promise((resolve, reject) => {
                const cb = (error, data) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(data);
                }
                fn(cb);
            })
        })
        Promise.all(funcs).then((value) => {
            lastCallback(undefined, value);
        }).catch((error) => {
            lastCallback(error, undefined);
        })

    }

}