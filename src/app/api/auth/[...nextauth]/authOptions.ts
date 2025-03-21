// auth/[...nextauth]/authOptions.ts

// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { DefaultUser, NextAuthOptions } from "next-auth";
// import { prisma } from "./prisma";
// import GoogleProvider from "next-auth/providers/google";
// import { Session } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   debug: true, // Enable/disable detailed logging
//   pages: {
//     signIn: "/auth/prihlasenie",
//     signOut: "/auth/odhlasenie",
//   },
//   callbacks: {
//     async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
//       return url.startsWith(baseUrl) ? url : baseUrl;
//     },
//     async session({ session, user }: { session: Session; user: DefaultUser }) {
//       session.user = user; // Include user info in the session
//       return session;
//     },
//   },
// };



// src/app/api/auth/[...nextauth]/authOptions.ts

import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions, DefaultSession } from "next-auth";
import { prisma } from "./prisma";
import GoogleProvider from "next-auth/providers/google";

// Extend the default session to always include `id`
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  pages: {
    signIn: "/auth/prihlasenie",
    signOut: "/auth/odhlasenie",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session({ session, user }) {
      session.user.id = user.id; // Ensure the user ID is always included
      return session;
    },
  },
};
