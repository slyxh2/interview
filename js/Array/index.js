// iterator
Array.prototype[Symbol.iterator] = function* () {
    console.log('PATRICK')
    for (let i = 0; i < this.length; i++) {
        yield this[i];
    }
}

// at
Array.prototype.at = function (index = 0) {
    console.log('PATRICK');
    if (index < 0) index = this.length + index;
    return this[index];
}

// concat
Array.prototype.concat = function (...args) {

}