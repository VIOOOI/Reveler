export default (input: string): string => {
	const replacements: { [key: string]: string } = {
		"&lt;": "<",
		"&gt;": ">",
	};

	return input.replace(/&lt;|&gt;/g, (entity) => replacements[entity]);
};
