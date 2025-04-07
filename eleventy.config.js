import EleventyConfig from "@11ty/eleventy";
import esbuild from "esbuild";
import path from "path";

export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("assets");
	eleventyConfig.configureErrorReporting({ allowMissingExtensions: true });
	eleventyConfig.addWatchTarget("./src/ts/");

	eleventyConfig.on("eleventy.before", async () => {
		console.log("Building JS with esbuild...");
		await esbuild
			.build({
				entryPoints: ["src/scripts/index.ts"],
				bundle: true,
				outfile: "_site/assets/js/index.js",
				minify: true,
				target: "esnext",
				format: "iife",
				logLevel: "info",
			})
			.catch((error) => {
				console.error("esbuild failed:", error);
				process.exit(1);
			});
		console.log("esbuild finished.");
	});

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
