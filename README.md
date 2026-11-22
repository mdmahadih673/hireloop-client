# Hireloop

Hireloop is a job platform for seekers and recruiters. Job seekers can browse roles, apply, and follow application status updates. Recruiters can publish jobs, review applicants, and update their status. Premium access is purchased once and expires after the selected access period.

## Requirements

- Node.js 20.9 or later
- A running Hireloop API and MongoDB database
- Better Auth credentials and a Stripe account for account and payment flows

## Configure the frontend

Create `.env.local` in this directory. Keep it out of version control.

```dotenv
MONGODB_URI=mongodb_connection_string
BETTER_AUTH_SECRET=shared_random_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
STRIPE_SECRET_KEY=sk_test_your_key
```

`BETTER_AUTH_SECRET` must match the API's value because the API verifies the signed Better Auth session cookie. Configure OAuth credentials if Google or GitHub sign in should be enabled. Stripe checkout uses `STRIPE_SECRET_KEY`; use test keys locally.

## Run locally

Start the API in `hireloop-sarver` first, then run the frontend here:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The API defaults to `http://localhost:5000`; set `NEXT_PUBLIC_API_BASE_URL` if it runs elsewhere.

## Useful commands

```bash
npm run typecheck
npm run lint
npm run build
```

## Main routes

- `/browse-jobs` — search and filter available job listings
- `/companies` — companies grouped from their posted jobs
- `/Dashboard/Seeker` — application overview and Premium status
- `/Dashboard/Recruiter` — job post and applicant overview
- `/Dashboard/Recruiter/jobs` — recruiter job posts and applicant links
- `/pricing` — seeker and recruiter one time Premium plans

## Production setup

Set the same `BETTER_AUTH_SECRET` in the frontend and API environments. Set `BETTER_AUTH_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL` to the production site origin, `NEXT_PUBLIC_API_BASE_URL` to the deployed API origin, and configure OAuth callback URLs for that site. On the API, set `FRONTEND_ORIGINS` to the allowed site origin and configure `STRIPE_WEBHOOK_SECRET` for Stripe's `checkout.session.completed` webhook. See the API repository README for API environment details.
