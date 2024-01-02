const set = new Set();

const arr = new Array(set);
arr[1] = 1;
arr[2] = 2;

console.log(arr);

Array.prototype[Symbol.iterator] = function* () {
    for (let i = 0; i < this.length; i++) {
        yield this[i];
    }
}

// const fn = arr[Symbol.iterator]();

// console.log(fn.next());
// arr.length = 1;
// console.log(fn.next());

for (const item of arr) {
    console.log(item);
}