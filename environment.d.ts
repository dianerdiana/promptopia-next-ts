import Next from "next";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      MONGODB_URI: string;
    }
  }
}
