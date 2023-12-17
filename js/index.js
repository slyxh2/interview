function test() {
    console.log(this);
    function inner() {
        console.log(this);
    }
    inner();
}

test.call({ a: 2 });