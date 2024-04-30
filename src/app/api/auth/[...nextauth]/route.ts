import GlobalClientInstance from "@/app/lib/api/GlobalClientInstance";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        loginAs: { label: "Login As", type: "text" },
      },
      async authorize(credentials, req) {
        const payload = {
          username: credentials?.username,
          password: credentials?.password,
        };
        try {
          let endPoint = "";
          switch (credentials?.loginAs) {
            case "admin":
              endPoint = "/auth/signin-admin";
              break;
            case "student":
              endPoint = "/auth/signin-student";
              break;
            case "employee":
              endPoint = "/auth/signin-employee";
              break;
          }
          const { data } = await GlobalClientInstance.post(endPoint, payload);
          console.log(data.data);
          return {
            ...data.data,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  session: {
    maxAge: 3 * 24 * 60 * 60 * 1000,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      session = { ...session, ...token };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
