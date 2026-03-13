import { betterAuth } from "better-auth"
import { PrismaClient } from "../generated/prisma/client"
import { prismaAdapter } from "@better-auth/prisma-adapter"
import { PrismaPg } from "@prisma/adapter-pg"
// import { transporter } from "./mail"
import { sendEmail } from "@better-auth/infra"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

export const prisma = new PrismaClient({
  adapter,
})

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  trustedOrigins: ["http://localhost:3000"],

  emailVerification: {
    sendOnSignUp: true,

    async sendVerificationEmail({ user, url }) {
      await sendEmail({
        template: "verify-email",
        to: user.email,
        variables: {
          verificationUrl: url,
          userEmail: user.email,
          userName: user.name,
          appName: "Tudor",
        },
      })
    },
  },
})