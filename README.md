# NexusAI - Modern SaaS Starter

A modern full-stack starter template powered by Next.js, Supabase, and Tailwind CSS.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env` and update the following variables:
   - Supabase URL and anon key (from your Supabase project settings)
   - `RESEND_API_KEY`: Get this from [Resend](https://resend.com) for contact form emails
4. Run database migrations: `npx supabase db push`
5. Start development server: `npm run dev`

## Features

- Contact form that sends emails to info@apprisingcreatives.com
- User authentication with Supabase
- Blog management system
- Portfolio showcase
- Responsive design with Tailwind CSS

## Contact Form

The contact form sends emails to `info@apprisingcreatives.com` using Resend. Make sure to set up your Resend API key in the `.env` file.
