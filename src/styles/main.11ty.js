import * as sass from 'sass';
import path from 'path';
import { fileURLToPath } from 'url';

const isProd = process.env.ELEVENTY_ENV === 'production';
const ENTRY_FILE_NAME = 'main.scss';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default class {
	async data() {
		return {
			permalink: '/assets/css/main.css',
			eleventyExcludeFromCollections: true,
		};
	}

	async render() {
		const entryPath = path.join(__dirname, ENTRY_FILE_NAME);

		try {
			const result = sass.compile(entryPath, {
				style: isProd ? 'compressed' : 'expanded',
				sourceMap: !isProd,
			});
			return result.css;
		} catch (err) {
			if (isProd) throw err;
			console.error(err);
			return this.renderError(err.message || err.toString());
		}
	}

	renderError(message) {
		return `
		body::after {
			content: "${message.replace(/"/g, "'")}";
			white-space: pre;
			position: fixed;
			top: 1rem; left: 1rem;
			background: #f8d7da;
			color: #721c24;
			padding: 1rem;
			font-family: monospace;
			border: 2px solid red;
		}`;
	}
}

export const css = async () => {
	const result = sass.compile('src/styles/main.scss', {
		style: 'compressed'
	});
	return result.css;
};