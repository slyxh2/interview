const getAll = async () => {
    const prev = performance.now();
    while (performance.now() - prev < 100) {
        console.log(2);
    }
    return Promise.resolve([1, 2, 3]);
};

const fn = async () => {
    const res = await getAll();
    console.log(res);
}

fn();