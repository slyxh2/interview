
/**
 * @param {any} target
 * @param {any[]} sources
 * @return {object}
 */
function objectAssign(target, ...sources) {
    // your code heres
    if (target === undefined || target === null) throw new Error('Error');
    if (typeof target !== 'object' || typeof !target == 'function') {
        target = Object(target);
    }
    for (let i = 0; i < sources.length; i++) {
        const source = sources[i];
        if (source === null || (typeof source !== 'object' && typeof source !== 'function' && typeof source !== 'string')) continue;
        const keys = [...Object.keys(source), ...Object.getOwnPropertySymbols(source)];
        keys.forEach(key => {
            target[key] = source[key];
            if (target[key] !== source[key]) {
                throw new Error('writable is false')
            }
        });
    }
    return target;
}