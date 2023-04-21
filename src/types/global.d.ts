declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    LOG_DIR: string;

    DB_NAME: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
    DB_PASSWORD: string;

    REDIS_HOST: string;
    REDIS_PORT: string;

    ACCESS_TOKEN_VALIDITY_SEC: string;
    REFRESH_TOKEN_VALIDITY_SEC: string;
    TOKEN_ISSUER: string;
    TOKEN_AUDIENCE: string;
  }
}
