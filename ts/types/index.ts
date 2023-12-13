type MyReturnType<T> = T extends (...args: any) => infer R ? R : never;
const fn = (v: boolean) => v ? 1 : 2
const fn1 = (v: boolean, w: any) => v ? 1 : 2
type A = MyReturnType<typeof fn>;
