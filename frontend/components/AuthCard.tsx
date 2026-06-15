import { SubmitEventHandler } from "react";
import PageTabLink from "./PageTabLink";
import { useRouter } from "next/navigation";
import { Button } from "./Button";

type AuthCardProps = {
  buttonText: string;
  children: React.ReactNode;
  onSubmit?: SubmitEventHandler<HTMLFormElement>;
  title: "login" | "signup" | "forgot-password" | "reset-password";
  isLoading?: boolean;
};

const authTitles: Record<
  Exclude<AuthCardProps["title"], "login" | "signup">,
  string
> = {
  "forgot-password": "Forgot Password",
  "reset-password": "Create new password",
};

const authDescriptions: Record<
  Exclude<AuthCardProps["title"], "login" | "signup">,
  string
> = {
  "forgot-password":
    "Enter your email address and we’ll send you a link to reset your password.",
  "reset-password":
    "Create a new password. Your new password must be different from your previous password.",
};

export function AuthCard({
  buttonText,
  children,
  title,
  isLoading = false,
  onSubmit,
}: AuthCardProps) {
  const router = useRouter();
  const isAuthTabs = title === "login" || title === "signup";
  return (
    <div className="w-[414px] py-[19.5px] mt-[74px] mb-[160px] py-[29px] mx-[21px]">
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[12px]">
          <div className="flex gap-4">
            {isAuthTabs ? (
              <div className="flex gap-4">
                <PageTabLink href="/login" active={title === "login"}>
                  Log in
                </PageTabLink>

                <PageTabLink href="/sign-up" active={title === "signup"}>
                  Sign Up
                </PageTabLink>
              </div>
            ) : (
              <span className="font-normal text-[24px]">
                {authTitles[title]}
              </span>
            )}
          </div>

          {isAuthTabs ? (
            <></>
          ) : (
            <p className="text-[14px] font-normal leading-[16px] tracking-normal align-middle">
              {authDescriptions[title]}
            </p>
          )}
        </div>

        {children}

        {isAuthTabs ? (
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="max-w-[370px] w-[200px] h-[53px] 
              bg-surface-accent 
              hover:bg-surface-accent-muted
              hover:text-card-dark transition-colors duration-200
              leading-[38px] cursor-pointer rounded-[20px]
              font-normal
              text-[24px]
              leading-[28px]
              text-center
              align-middle
              disabled:opacity-50
              disabled:cursor-not-allowed
              disabled:hover:bg-surface-accent
              disabled:hover:text-inherit
              "
            >
              {buttonText}
            </button>
          </div>
        ) : (
          <div className="flex justify-center gap-[12px] xs:flex-row flex-col px-[17px] xs:w-full ">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              hoverVariant="accent_muted"
              className="w-full h-[42px]"
              py={10}
            >
              {buttonText}
            </Button>
            <Button
              type="button"
              variant="ternary"
              size="lg"
              hoverVariant="accent_muted"
              className="w-full h-[42px]"
              py={10}
              onClick={() => router.push("/login")}
            >
              Back to login
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
