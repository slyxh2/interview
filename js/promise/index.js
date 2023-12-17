const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function isFunction(input) {
    return Object.prototype.toString.call(input) === '[object Function]';
}

function isObjectOrFunction(input) {
    const typeStr = Object.prototype.toString.call(input);
    return typeStr === '[object Function]' || typeStr === '[object Object]';
}

function isPromise(input) {
    return Object.prototype.toString.call(input) === '[object _Promise]';
}

function handleFnAsyncRun(fn, value) {
    setTimeout(() => {
        try {
            fn.call(undefined, value);
        } catch (err) {
            setTimeout(() => {
                throw err;
            })
        }
    })
}

function resolvePromise(promise, x, resolve, reject) {
    if (x === promise) throw new TypeError('Chaining cycle detected for promise');
    if (isPromise(x)) {
        x.then((value) => {
            resolve(value);
        }, (reason) => {
            reject(reason);
        })
    } else if (isObjectOrFunction(x)) {
        let then;
        try {
            then = x.then;
        } catch (reason) {
            reject(reason);
        }
        let isCalled = false;
        let newResolve = function (y) {
            if (isCalled) return;
            isCalled = true;
            handleFnAsyncRun(() => resolvePromise(promise, y, resolve, reject));
        }
        let newReject = function (reason) {
            if (isCalled) return;
            isCalled = true;
            reject(reason);
        }
        if (isFunction(then)) {
            try {
                then.call(x, newResolve, newReject);
            } catch (reason) {
                if (!isCalled) reject(reason);
            }
        } else {
            resolve(x);
        }
    } else {
        resolve(x);
    }
}

function handleThenCallback(callback, resolve, reject, promise) {
    return function (value) {
        function inner() {
            try {
                const res = callback.call(undefined, value);
                resolvePromise(promise, res, resolve, reject);
            } catch (reason) {
                reject(reason);
            }
        }
        handleFnAsyncRun(inner, value);
    }
}

function handleOnFulfilled(callback, resolve, reject, promise) {
    // fulfilled but onFulfilled not a function
    if (!isFunction(callback)) return function (value) {
        resolve(value);
    }
    return handleThenCallback(callback, resolve, reject, promise);
}

function handleOnRejected(callback, resolve, reject, promise) {
    // rejected but onReject is not a function
    if (!isFunction(callback)) return function (value) {
        reject(value);
    }
    return handleThenCallback(callback, resolve, reject, promise);
}


class _Promise {
    PromiseState = PENDING;
    PromiseResult = undefined;
    #resolveQueue = [];
    #rejectQueue = [];
    constructor(callback) {
        this[Symbol.toStringTag] = "_Promise";
        callback(this.resolve, this.reject);
    }
    then(onFulfilled, onRejected) {
        let retrunResolveFn, returnRjectFn;
        const returnPromise = new _Promise((res, rej) => {
            retrunResolveFn = res;
            returnRjectFn = rej;
        })

        onFulfilled = handleOnFulfilled(onFulfilled, retrunResolveFn, returnRjectFn, returnPromise);
        onRejected = handleOnRejected(onRejected, retrunResolveFn, returnRjectFn, returnPromise);
        if (this.PromiseState === PENDING) {
            if (onFulfilled) this.#resolveQueue.push(onFulfilled);
            if (onRejected) this.#rejectQueue.push(onRejected);
        } else if (this.PromiseState === FULFILLED) {
            onFulfilled(this.PromiseResult);
        } else if (this.PromiseState === REJECTED) {
            onRejected(this.PromiseResult);
        }
        return returnPromise;
    }
    resolve = (value) => {
        if (this.PromiseState !== PENDING) return;
        resolvePromise(this, value, this.#resolveHelper, this.reject);
    }
    reject = (reason) => {
        if (this.PromiseState !== PENDING) return;
        this.PromiseState = REJECTED;
        this.PromiseResult = reason;
        while (this.#rejectQueue.length > 0) {
            const fn = this.#rejectQueue.shift();
            fn(this.PromiseResult)
        }
    }
    #resolveHelper = (value) => {
        if (this.PromiseState !== PENDING) return;
        this.PromiseState = FULFILLED;
        this.PromiseResult = value;
        while (this.#resolveQueue.length > 0) {
            const fn = this.#resolveQueue.shift();
            fn(this.PromiseResult);
        }
    }
    static resolve(value) {
        return new _Promise((resolve) => {
            resolve(value);
        })
    }
    static reject(reason) {
        return new _Promise((_, reject) => {
            reject(reason);
        })
    }
    static all(arr) {
        return new _Promise((resolve, reject) => {
            let input = [...arr];
            if (input.length === 0) {
                resolve([]);
                return;
            }
            let result = [];
            let count = 0;
            for (let i = 0; i < input.length; i++) {
                let item = input[i];
                const onFulfilled = (value) => {
                    count++;
                    result[i] = value;
                    if (count === input.length) resolve(result);
                }
                const onRejected = (reason) => {
                    reject(reason);
                }
                if (isPromise(item)) {
                    item.then(onFulfilled, onRejected)
                } else {
                    _Promise.resolve(item).then(onFulfilled, onRejected);
                }
            }
        })
    }
}
