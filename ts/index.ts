function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {

    let timer: number;

    return ((...args: any[]): void => { clearTimeout(timer); timer = setTimeout(() => func(...args), wait); }) as T;

}