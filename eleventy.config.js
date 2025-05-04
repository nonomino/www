import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import * as shortcodes from './utils/shortcodes.js';

Error.stackTraceLimit = 100;

export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("assets");
	eleventyConfig.configureErrorReporting({
		allowMissingExtensions: true
	});
	eleventyConfig.addWatchTarget("./src/scripts/");
	eleventyConfig.addWatchTarget("./src/styles/");

	Object.keys(shortcodes).forEach((name) => {
		eleventyConfig.addShortcode(name, shortcodes[name])
	})

	return {
		dir: {
			input: "src",
			output: "_site",
			includes: "_includes",
			layouts: "_layouts",
			data: "_data",
		},
		urlFormat: {
			trailingSlash: false,
		},
	};
}