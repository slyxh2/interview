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

// entries
Array.prototype.entries = function () {
    console.log('PATRICK');
    const that = this;
    function* inner() {
        for (let i = 0; i < that.length; i++) {
            yield [i, that[i]];
        }
    }
    return inner();
}

// every
Array.prototype.every = function (callback, thisArg) {
    const that = this;
    for (let i = 0; i < that.length; i++) {
        if (!callback.call(thisArg, that[i], i, that)) {
            return false;
        }
    }
    return true;
}

// fill 
Array.prototype.fill = function () {

}