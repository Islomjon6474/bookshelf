export function assertDefined(x: unknown, message?: string): asserts x {
    if (x === undefined || x === null) {
        throw new TypeError(message || 'Value must not be null or undefined');
    }
}