import { signIn } from "@/lib/auth-client"

export function SocialAuthButtons() {


  async function handleProviderClick(provider: "google" | "github") {
    await signIn.social({
      provider,
      callbackURL: "/",
    })
  }

  const buttonClassName =
    "flex h-12 w-full items-center cursor-pointer justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.035] px-3 text-sm font-medium text-white/85 transition hover:border-white/20 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a99dff]"

  return (
    <div className="mt-7">
      <div className="grid grid-cols-2 gap-3">


        <button
          className={buttonClassName}
          onClick={() => handleProviderClick("google")}
          type="button"
        >
          <svg
            aria-hidden="true"
            className="size-[18px]"
            viewBox="0 0 48 48"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
              transform="translate(0 4)"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.64 5.93c4.46-4.13 7.13-10.2 7.13-17.58Z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z"
              transform="translate(0 4)"
            />
            <path
              fill="#34A853"
              d="M24 48c6.47 0 11.91-2.13 15.88-5.8l-7.64-5.93c-2.12 1.42-4.84 2.26-8.24 2.26-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
            />
          </svg>
          Google
        </button>


        <button
          className={buttonClassName}
          onClick={() => handleProviderClick("github")}
          type="button"
        >
          <svg
            aria-hidden="true"
            className="size-[18px]"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path d="M6 5 9 6.5a8 8 0 0 1 6 0L18 5l1 4a8 8 0 0 1-14 0l1-4Z" />
            <path d="M8 12v4c0 2 2 3 4 3s4-1 4-3v-4M8 15H6a2 2 0 0 1-2-2" />
          </svg>
          GitHub
        </button>


      </div>
      <div className="my-6 flex items-center gap-4">
        <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-white/35">or continue with email</span>
        <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
      </div>
    </div>
  )
}
