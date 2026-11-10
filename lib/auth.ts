import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db('hireloopdb');

const vercelOrigin = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined;
const baseURL = process.env.BETTER_AUTH_URL || vercelOrigin;
const trustedOrigins = [
    baseURL,
    vercelOrigin,
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    ...(process.env.NODE_ENV === "production" ? [] : ["http://localhost:3000"]),
].filter((origin): origin is string => Boolean(origin))
    .map((origin) => new URL(origin).origin)
    .filter((origin) => process.env.NODE_ENV !== "production" || !new URL(origin).hostname.includes("localhost"));

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
