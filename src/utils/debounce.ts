type AnyFunction = (...args: any[]) => any;

export default <T extends AnyFunction>(func: T, delay = 2000): T => {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	const debouncedFunction = (...args: Parameters<T>): void => {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			// eslint-disable-next-line prefer-spread
			func.apply(null, args);
		}, delay);
	};

	return debouncedFunction as T;
};
