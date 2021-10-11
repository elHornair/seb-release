module.exports = {
  devServer: {
    proxy: {
      "^/oauth": {
        target: process.env.API_URL,
        onProxyReq(proxyReq) {
          const basicAuthHeader = `Basic ${btoa(
            process.env.BASIC_AUTH_USER + ":" + process.env.BASIC_AUTH_PASSWORD
          )}`;

          proxyReq.setHeader("Authorization", basicAuthHeader);
        },
      },
      "^/admin-api": {
        target: process.env.API_URL,
      },
    },
  },
};
