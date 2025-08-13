import { defineConfig } from 'vite';

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/style.css");

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };
}
