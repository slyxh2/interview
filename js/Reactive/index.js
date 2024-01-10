let obj = {
    value: {
        count: 1
    }
}

const val = { count: 1 };

Object.defineProperty(obj, 'value', {
    get() {
        console.log('get');
        return val;
    },
    set() {
        console.log('set');
    }
})