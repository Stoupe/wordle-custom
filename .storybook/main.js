module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    'storybook-dark-mode'
  ],
  framework: '@storybook/react',
  features: {
    storyStoreV7: true,
    // babelModeV7: true,
    previewMdx2: true
  },
  core: {
    builder: {
      name: 'webpack5',
      options: {
        fsCache: true,
        lazyCompilation: true
      }
    }
  }
};
