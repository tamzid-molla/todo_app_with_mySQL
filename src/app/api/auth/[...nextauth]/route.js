import db from "@/lib/db";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: { label: "Email", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      // Add logic here to look up the user from the credentials supplied
      const [user] = await db.query("SELECT * FROM users WHERE email = ? ", [credentials.email]);
      const isPasswordCorrect = user[0].password === credentials.password;
      if (isPasswordCorrect) {
        // Any object returned will be saved in `user` property of the JWT
        return user[0]
      } else {
        // If you return null then an error will be displayed advising the user to check their details.
        return null

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      }
    }
  })
  ],
   pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user, token }) {
      if (token) {
        session.user.email = token.email;
      }
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.email = user.email
      }
      return token
    }
   }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST , authOptions }
