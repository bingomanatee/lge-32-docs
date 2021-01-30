// Example config for adding a loader that depends on babel-loader
// This source was taken from the @next/mdx plugin source:
// https://github.com/vercel/next.js/tree/canary/packages/next-mdx
module.exports = {
  webpack: (config, { buildId, options, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.txt/,
      use: [
        defaultLoaders.babel,
        {
          loader: 'raw-loader',
        },
      ],
    })

    return config
  },
}
