import fs from "node:fs/promises";
import path from "node:path";
import * as esbuild from "esbuild";
import katex from "katex";
import markdownIt from "markdown-it";
import texmath from "markdown-it-texmath";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

const isProd = process.env.ELEVENTY_ENV === "production";

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function buildCss() {
  const inputPath = path.resolve("src/assets/css/input.css");
  const outputPath = path.resolve("dist/assets/css/main.css");
  const css = await fs.readFile(inputPath, "utf8");

  const result = await postcss([tailwindcss()]).process(css, {
    from: inputPath,
    to: outputPath,
  });

  await ensureDir(outputPath);
  await fs.writeFile(outputPath, result.css);
}

async function buildJs() {
  await ensureDir("dist/assets/js/main.js");
  await esbuild.build({
    entryPoints: {
      main: "src/assets/js/main.js",
      comments: "src/assets/js/comments.js",
      "statsman-til": "src/assets/js/statsman-til.js",
    },
    outdir: path.resolve("dist/assets/js"),
    bundle: true,
    minify: isProd,
    sourcemap: !isProd,
    target: ["es2020"],
    format: "iife",
  });
}

export default function (eleventyConfig) {
  eleventyConfig.on("eleventy.before", async () => {
    await Promise.all([buildCss(), buildJs()]);
  });

  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      linkify: true,
      typographer: true,
    }).use(texmath, {
      engine: katex,
      delimiters: ["dollars", "brackets"],
      katexOptions: { throwOnError: false },
    }),
  );

  eleventyConfig.addPassthroughCopy({
    "node_modules/katex/dist/katex.min.css": "assets/vendor/katex/katex.min.css",
    "node_modules/katex/dist/fonts": "assets/vendor/katex/fonts",
  });

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/posts/**/*.md").sort((a, b) => {
      return (b.date?.getTime?.() ?? 0) - (a.date?.getTime?.() ?? 0);
    }),
  );

  eleventyConfig.addFilter("readableDate", (date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  });

  eleventyConfig.addFilter("isoDate", (date) => {
    if (!date) return "";
    return new Date(date).toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter("pad2", (value) =>
    String(value).padStart(2, "0"),
  );

  eleventyConfig.addFilter("trackNav", (posts, currentUrl, track) => {
    const siblings = (posts ?? [])
      .filter((post) => post.data?.track === track)
      .sort((a, b) =>
        String(a.data.level ?? "").localeCompare(
          String(b.data.level ?? ""),
          undefined,
          { numeric: true },
        ),
      );

    const index = siblings.findIndex((post) => post.url === currentUrl);

    return {
      prev: index > 0 ? siblings[index - 1] : null,
      next:
        index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : null,
    };
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
}
