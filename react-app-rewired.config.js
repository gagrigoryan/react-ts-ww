module.exports = {
  webpack: (config) => {
    config.module.rules.unshift({
      test: /\.worker\.ts$/,
      use: {
        loader: "worker-loader",
        options: {
          // Use directory structure & typical names of chunks produces by "react-scripts"
          filename: "static/js/[name].[contenthash:8].js",
        },
      },
    });
    return config;
  },
};
