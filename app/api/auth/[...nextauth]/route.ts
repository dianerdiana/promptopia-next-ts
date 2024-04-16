import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

// Utils
import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (session.user) {
        const sessionUser = await User.findOne({
          email: session.user.email,
        });

        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
      }

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        // check if a user already exists
        const userExists = await User.findOne({
          email: profile?.email,
        });

        // if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name
              ? profile?.name.replaceAll(" ", "").toLowerCase()
              : "",
            image: profile?.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
