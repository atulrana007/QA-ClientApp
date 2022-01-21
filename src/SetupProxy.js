const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/oauth/token", {
      target: "https://idqa.mcafee.com", // API endpoint 1

      changeOrigin: true,

      headers: {
        Connection: "keep-alive",
      },
    })
  );

  app.use(
    createProxyMiddleware("/passwordless/start", {
      target: "https://idqa.mcafee.com", // API endpoint 1

      changeOrigin: true,

      headers: {
        Connection: "keep-alive",
      },
    })
  );

  app.use(
    createProxyMiddleware("/v2/ProductProvision/GetSubscriptions", {
      target: "https://provision.ppqa1.ccs.mcafee.com", // API endpoint 2

      changeOrigin: true,

      headers: {
        Connection: "keep-alive",
      },
    })
  );
  app.use(
    createProxyMiddleware("/v2/ProductProvision/GetSubscriptions", {
      target: "https://app-mcafee-qa-tenant.netlify.app/", // API endpoint 2

      changeOrigin: true,

      headers: {
        Connection: "keep-alive",
      },
    })
  );
};
