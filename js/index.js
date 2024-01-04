const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
    console.log('click')
})
requestIdleCallback(() => {
    console.log(1);
})
requestAnimationFrame(() => {
    console.log("requestAnimationFrame");
})
setTimeout(() => {
    let start = Date.now();
    // btn.innerText = '22';
    btn.style.transform = 'translateX(100px)';
    while (Date.now() - start < 2000) {
        console.log(0);
    }
    Promise.resolve().then(() => console.log(777))
}, 0)