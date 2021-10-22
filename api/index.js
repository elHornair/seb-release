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
      // TODO: remove debug
      console.log("***************");
      console.log(
        "got a proxy request to oauth api. Gonna add Basic Auth headers"
      );
      console.log(process.env.API_URL);
      console.log(process.env.BASIC_AUTH_USER);
      console.log(process.env.BASIC_AUTH_PASSWORD);

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
    onProxyReq() {
      // TODO: remove debug
      console.log("***************");
      console.log(
        "got a proxy request to admin-api. not doing anything except redirecting..."
      );
    },
  })
);

module.exports = app;

// TODO: https://vercel.com/guides/using-express-with-vercel
// TODO: then use https://github.com/chimurai/http-proxy-middleware
// example: https://github.com/vercel/next.js/discussions/14057
