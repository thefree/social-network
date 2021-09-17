module.exports = {
  secret: "bezkoder-secret-key",
  jwtExpiration: 14400, // 4 hour
  jwtRefreshExpiration: 86400, // 24 hours

  /* for test */
  // jwtExpiration: 60,          // 1 minute
  // jwtRefreshExpiration: 120,  // 2 minutes
};
