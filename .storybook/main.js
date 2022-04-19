module.exports = {
  framework: "@storybook/vue3",
  stories: ["../src/**/*.stories.@(ts|js)"],
  addons: ["@storybook/addon-essentials", "@storybook/preset-scss"],
  staticDirs: ["./public"],
  core: {
    builder: "webpack5",
  },
  features: {
    babelModeV7: true,
  },
  /**
   * Original webpack config: {@link https://github.com/storybookjs/storybook/blob/main/app/vue3/src/server/framework-preset-vue3.ts}
   */
  webpackFinal: (config) => {
    config.experiments = {
      backCompat: false,
    };
    return config;
  },
};
