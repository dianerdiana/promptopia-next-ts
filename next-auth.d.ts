import NextAuth, { DefaultSession, Profile } from "next-auth";

import { GoogleProfile } from "next-auth/providers/google";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal id. */
      id: string;
    } & DefaultSession["user"];
  }

  interface Profile extends GoogleProfile {}
}
