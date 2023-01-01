import NextAuth from "next-auth";
import { compareSync } from "bcrypt";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import connectDB from "../../../lib/conntection";
import User from "../../../models/Schema";

export const authOptions = {
  // Configure one or more authentication providers
  secret: "RnGxYhx9xuxZC0QjFZCh+a6JAiFvWn9SyvTSvppKmpg=",

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // email: { label: "Email", type: "text", placeholder: "jsmith" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        await connectDB().catch((error) =>
          // res.json({ error: "Connection failed" })
          console.log("error", error)
        );

        const { email, password } = credentials;

        if (!email || !password) {
          console.log("No email or password");
          throw new Error("No email or password");
        }

        const userExists = await User.findOne({ email: credentials.email });
        if (!userExists) {
          throw new Error("User not found");
        }

        const checkPassword = compareSync(
          credentials.password,
          userExists.password
        );

        if (!checkPassword) {
          throw new Error("Password is incorrect");
        }

        if (checkPassword && userExists) {
          return userExists;
        }

        return null;

        const res = await fetch("/your/endpoint", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID!,
    //   clientSecret: process.env.FACEBOOK_SECRET!,
    // }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
