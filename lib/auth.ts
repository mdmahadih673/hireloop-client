import { betterAuth } from "better-auth";
import { getOAuthState } from "better-auth/api";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("hireloopdb");

function normalizeOrigin(value: string | undefined): string | undefined {
  const candidate = value?.trim();
  const validCandidate = candidate
    ?.split("||")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part.includes("://") ? part : `https://${part}`)
    .find((part) => URL.canParse(part));
  return validCandidate ? new URL(validCandidate).origin : undefined;
}

const vercelOrigin = normalizeOrigin(process.env.VERCEL_URL)
const baseURL =
  normalizeOrigin(process.env.BETTER_AUTH_URL) ||
  normalizeOrigin(process.env.NEXT_PUBLIC_BETTER_AUTH_URL) ||
  vercelOrigin ||
  "http://localhost:3000"

const trustedOrigins = Array.from(
  new Set([
    baseURL,
    vercelOrigin,
    normalizeOrigin(process.env.NEXT_PUBLIC_BETTER_AUTH_URL),
    ...(process.env.NODE_ENV === "production" ? [] : ["http://localhost:3000"]),
  ].filter((origin): origin is string => Boolean(origin)))
)

export const auth = betterAuth({
  baseURL,
  trustedOrigins,
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "seeker",
        input: true,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const role = (await getOAuthState())?.role;
          if (role === "seeker" || role === "recruiter" || role === "admin") {
            return { data: { ...user, role } };
          }
        },
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
