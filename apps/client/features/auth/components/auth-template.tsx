import Link from "next/link";
import ClaraWordmark from "@/components/molecules/clara-wordmark";
import SocialOAuthButton from "./social-oauth-button";

export default function AuthTemplate({title, description}: {
    title: string;
    description: string;
}) {
  return (
    <>
      <div className="flex justify-start w-full py-3 px-[7%]">
        <ClaraWordmark width={45} height={45} />
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="w-full max-w-md px-4">
          <div className="flex flex-col items-center gap-2">
            <h1 className="font-semibold text-3xl text-center">
              {title}
            </h1>
            <p className="text-sm text-center text-muted-foreground">
              {description}
            </p>
          </div>
          <SocialOAuthButton />
          <div className="flex justify-center mt-14">
            <p className="text-xs text-center max-w-xs">
              By continuing, you agree to Clara’s{" "}
              <Link
                href="/terms"
                className="text-primary font-semibold underline"
              >
                Terms of Service
              </Link>{" "}
              an our{" "}
              <Link
                href="/privacy"
                className="text-primary font-semibold underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
