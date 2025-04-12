import { css } from '../src/styles/main.11ty.js';

export const criticalCSS = async () => {
    return `<style>${await css()}</style>`;
};