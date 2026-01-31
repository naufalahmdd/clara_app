"use client";

import Image from "next/image";
import { Button } from "@/components/atoms/button";

export default function SocialOAuthButton() {
  return (
    <div className="flex flex-col gap-5 mt-14">
      <Button variant="outline" type="button" className="w-full h-10">
        <Image src="/google.svg" alt="Google icon" width={22} height={22} />
        Continue with Google
      </Button>
      <Button variant="outline" type="button" className="w-full h-10">
        <Image
          src="/microsoft.svg"
          alt="Microsoft icon"
          width={22}
          height={22}
        />
        Continue with Microsoft
      </Button>
    </div>
  );
}
