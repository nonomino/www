import * as esbuild from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';

const isProd = process.env.ELEVENTY_ENV === 'production';
const ENTRY_FILE_NAME = 'index.ts';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default class {
	async data() {
		return {
			permalink: '/assets/js/index.js',
			eleventyExcludeFromCollections: true,
		};
	}

	async render() {
		const entryPath = path.join(__dirname, ENTRY_FILE_NAME);

		try {
			console.log("Building JS with esbuild...");
			const result = await esbuild.build({
				entryPoints: [entryPath],
				bundle: true,
				write: false,
				format: 'iife',
				minify: true,
				sourcemap: false,
				target: 'esnext',
			});

			return result.outputFiles[0].text;
		} catch (err) {
			if (isProd) throw err;
			console.error(err);
			return this.renderError(err.message || err.toString());
		}
	}

	renderError(message) {
		return `
		console.error(${JSON.stringify(message)});
		alert(${JSON.stringify(message)});
		`;
	}
}