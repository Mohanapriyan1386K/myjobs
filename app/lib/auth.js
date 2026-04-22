import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUserByEmail, toSafeUser, upsertGoogleUser } from "./user-model";
import { verifyPassword } from "./password";

async function refreshAccessToken(token) {
  try {
    const url = "https://oauth2.googleapis.com/token";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();
    if (!response.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      expiresAt: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Refresh Token Error", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email || "")
          .trim()
          .toLowerCase();
        const password = String(credentials?.password || "");

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        const user = await findUserByEmail(email);
        if (!user || !user.passwordHash) {
          throw new Error("Invalid email or password");
        }

        const validPassword = await verifyPassword(password, user.passwordHash);
        if (!validPassword) {
          throw new Error("Invalid email or password");
        }

        if (!user.emailVerified) {
          throw new Error("Please verify your email first");
        }

        return toSafeUser(user);
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "credentials" && user) {
        token.user = user;
        return token;
      }

      if (account?.provider === "google") {
        if (user?.email) {
          const dbUser = await upsertGoogleUser({
            name: user.name,
            email: user.email,
            image: user.image,
          });
          token.user = toSafeUser(dbUser);
        }

        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at ? account.expires_at * 1000 : null;
      }

      if (!token.expiresAt || Date.now() < token.expiresAt) {
        return token;
      }

      if (!token.refreshToken) {
        return token;
      }

      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (token.user) {
        session.user = {
          ...session.user,
          ...token.user,
        };
      }
      session.accessToken = token.accessToken;
      return session;
    },
  },

  pages: {
    signIn: "/auth",
  },
};

