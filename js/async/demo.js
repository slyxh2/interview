
function handleAsyncFn(generatorFn) {
    return function (...args) {
        const gen = generatorFn.apply(this, args);
        return new Promise((resolve, reject) => {
            function runGen(key, arg) {
                let result;
                try {
                    result = gen[key](arg);
                } catch (err) {
                    reject(err);
                }

                const { value, done } = result;

                if (done) {
                    return resolve(value);
                } else {
                    return Promise.resolve(value).then((val) => {
                        runGen('next', val);
                    }, (reason) => {
                        runGen('throw', reason);
                    })
                }

            }
            runGen('next');
        })
    }
}
let getData = () => new Promise(resolve => setTimeout(() => resolve('data'), 1000));

function* test() {
    const data = yield getData();
    console.log('data: ', data);
    const data2 = yield getData();
    console.log('data2: ', data2);
    return 'success';
}

const fn = handleAsyncFn(test);

fn().then((res) => console.log(res));