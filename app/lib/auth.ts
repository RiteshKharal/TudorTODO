import { betterAuth } from "better-auth"
import { PrismaClient } from "../generated/prisma/client"
import { prismaAdapter } from "@better-auth/prisma-adapter"
import { PrismaPg } from "@prisma/adapter-pg"
import { dash } from "@better-auth/infra"
import { sendEmail } from "@better-auth/infra"
import { transporter } from "./mail"

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
  plugins:[
    dash(),
  ],

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  trustedOrigins: ["http://localhost:3000","https://tudortodo.vercel.app/"],

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    

    async sendVerificationEmail({ user, url }) {
      const result = await transporter.sendMail({
  from: '"Tudor" <onboarding@resend.dev>',
  to: user.email,
  subject: "Verify Your Tudor Account",
  html: `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">
  <tr>
    <td align="center">

      <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;padding:40px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.15);">

        <tr>
          <td>
            <h1 style="margin:0;color:#111827;font-size:28px;">
              Welcome to Tudor ✨
            </h1>
          </td>
        </tr>

        <tr>
          <td style="padding-top:16px;color:#374151;font-size:16px;line-height:1.6;">
            Hello <strong>${user.name}</strong>,<br><br>
            You're one step away from activating your account.
            Click the button below to verify your email and begin using Tudor.
          </td>
        </tr>

        <tr>
          <td style="padding:30px 0;">
            <a href="${url}"
               style="
                 background:linear-gradient(135deg,#6366f1,#4f46e5);
                 color:#ffffff;
                 text-decoration:none;
                 padding:14px 28px;
                 font-size:16px;
                 font-weight:bold;
                 border-radius:8px;
                 display:inline-block;
                 box-shadow:0 6px 18px rgba(79,70,229,0.35);
               ">
              Verify Email
            </a>
          </td>
        </tr>

        <tr>
          <td style="font-size:14px;color:#6b7280;line-height:1.6;">
            If you didn’t create an account, you can safely ignore this email.
          </td>
        </tr>

        <tr>
          <td style="padding-top:25px;font-size:12px;color:#9ca3af;">
            © Tudor • Most minimal TODO app out there.
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>
`
});

    },
  },
})
