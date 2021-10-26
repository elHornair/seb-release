const app = require("express")();
const { createProxyMiddleware } = require("http-proxy-middleware");

const btoa = (text) => {
  return Buffer.from(text, "binary").toString("base64");
};

app.use(
  "^/oauth",
  createProxyMiddleware({
    target: process.env.API_URL,
    changeOrigin: true,
    onProxyReq(proxyReq) {
      const basicAuthHeader = `Basic ${btoa(
        process.env.BASIC_AUTH_USER + ":" + process.env.BASIC_AUTH_PASSWORD
      )}`;

      proxyReq.setHeader("Authorization", basicAuthHeader);
    },
  })
);

app.use(
  "^/admin-api",
  createProxyMiddleware({
    target: process.env.API_URL,
    changeOrigin: true,
  })
);

module.exports = app;
