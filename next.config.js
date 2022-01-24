const { resolve, join } = require("path")
const ESLintPlugin = require("eslint-webpack-plugin")

module.exports = {
  webpack5: true,
  webpack: (config) => {
    if (!config.resolve.plugins) {
      config.resolve.plugins = []
    }
    if (!config.plugins) {
      config.plugins = []
    }
    if (!config.module.rules) {
      config.module.rules = []
    }

    config.plugins.push(
      new ESLintPlugin({
        threads: true,
        extensions: ["js", "jsx"],
        eslintPath: require.resolve("eslint"),
        context: "./src",
        cache: true,
        cacheLocation: join(
          __dirname,
          "node_modules",
          ".cache",
          ".eslintcache"
        ),
        cwd: resolve(__dirname, "."),
        resolvePluginsRelativeTo: __dirname,
      })
    )
    return config
  },
}
