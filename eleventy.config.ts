import { EleventyConfig } from "@11ty/eleventy";

export default function (eleventyConfig: EleventyConfig) {
	eleventyConfig.addPassthroughCopy("static");
	return {
		dir: {
			input: 'src',
			output: 'dist',
			includes: 'includes',
			layouts: 'layouts',
			data: 'data',
		}
	}
}