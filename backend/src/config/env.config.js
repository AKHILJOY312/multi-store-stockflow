export const ENV = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,

  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: process.env.EXPIRES_IN,
  },
};
