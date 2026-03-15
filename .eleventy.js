module.exports = function (eleventyConfig) {
  // Copy static asset folders unchanged into _site/
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("cookies");
  eleventyConfig.addPassthroughCopy("mascot");
  eleventyConfig.addPassthroughCopy("screenshots");

  // Copy Decap CMS config so it is served at /admin/config.yml
  eleventyConfig.addPassthroughCopy("admin/config.yml");

  // Disable the dev server's scroll position preservation on live reload
  eleventyConfig.setServerOptions({
    scroll: false,
  });

  return {
    // Treat .html files as plain HTML — no template engine processing
    htmlTemplateEngine: false,

    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
};
