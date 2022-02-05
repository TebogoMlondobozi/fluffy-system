export const config = (env) => ({
  payfast: {
    live_url:
      env === "production"
        ? process.env.REACT_APP_PAYFAST_LIVE
        : process.env.REACT_APP_PAYFAST_URL_SANDBOX,
    merchant_id:
      env === "production"
        ? process.env.REACT_APP_PAYFAST_MERCHANT_ID
        : process.env.REACT_APP_PAYFAST_MERCHANT_ID_DEV,
    merchant_key:
      env === "production"
        ? process.env.REACT_APP_PAYFAST_MERCHANT_KEY
        : process.env.REACT_APP_PAYFAST_MERCHANT_KEY_DEV,
    return_url:
      env === "production"
        ? process.env.REACT_APP_PAYFAST_RETURN_URL
        : process.env.REACT_APP_PAYFAST_RETURN_URL_DEV,
    cancel_url:
      env === "production"
        ? process.env.REACT_APP_PAYFAST_CANCEL_URL
        : process.env.REACT_APP_PAYFAST_CANCEL_URL_DEV,
    notify_url:
      env === "production"
        ? process.env.REACT_APP_PAYFAST_NOTIFY_URL
        : process.env.REACT_APP_PAYFAST_NOTIFY_URL_DEV,
  },
  server_url:
    env === "production"
      ? process.env.REACT_APP_SERVER_URL
      : process.env.REACT_APP_SERVER_URL_DEV,
});
