module.exports = {
  chainWebpack: (config) => {
    config.performance.maxEntrypointSize(400000).maxAssetSize(400000);
  },
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/sw.js",
      swDest: "service-worker.js",
    },
    themeColor: "#fafafa",
    msTileColor: "#fafafa",
    appleMobileWebAppCache: "yes",
    manifestOptions: {
      background_color: "#fafafa",
    },
  },

  pluginOptions: {
    i18n: {
      locale: "es",
      fallbackLocale: "es",
      localeDir: "locales",
      enableInSFC: false,
    },
  },
};
