module.exports = ({
  pageExtensions: ["tsx"],
  // Static export: every page is pre-rendered at build time, so the site
  // deploys to Cloudflare Workers as plain static assets (no Worker code,
  // no Node APIs at runtime). Deploy with `npx wrangler deploy`.
  output: "export",
  images: {
    unoptimized: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(
      ...[
        {
          test: /\.yml$/,
          type: "json",
          use: "yaml-loader",
        },
        {
          test: /\.svg$/,
          use: "@svgr/webpack",
        },
      ]
    );
    return config;
  },
});