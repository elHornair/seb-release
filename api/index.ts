const app = require("express")();
const { createProxyMiddleware } = require("http-proxy-middleware");

// @ts-ignore
// TODO: @ts-ignore is a quick workaround. The proper fix would be to tell TS that index.ts runs in a Node environment
const btoa = (text: string) => {
  // @ts-ignore
  return Buffer.from(text, "binary").toString("base64");
};

app.use(
  "^/oauth",
  createProxyMiddleware({
    target: process.env.API_URL,
    changeOrigin: true,
    onProxyReq(proxyReq: any) {
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
