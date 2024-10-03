export const mix = (...classes: (string | undefined | boolean)[]): string =>
	classes.reduce<string>((a, c) => {
		if (!c) return a;
		return a + " " + c;
	}, "");
