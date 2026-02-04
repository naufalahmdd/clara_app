import { Button } from "@/components/atoms/button";
import Link from "next/link";

export default function MarketingHero() {
  return (
    <section className="flex justify-center items-center w-full max-w-300 min-h-screen">
      <div className="flex flex-col items-center gap-8 w-full">
        <div className="flex flex-col items-center gap-4.5">
          <h1 className="font-semibold text-center text-6xl max-w-4xl leading-tight">
            Clear{" "}
            <span className="bg-linear-to-br from-primary via-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Projects
            </span>
            . Effortless{" "}
            <span className="bg-linear-to-br from-primary via-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Collaboration
            </span>
            .
          </h1>
          <p className="text-center text-muted-foreground max-w-lg">
            Keep every project on track, collaborate effortlessly with your
            team, and make decisions faster without the complexity.
          </p>
        </div>
        <Button asChild type="button">
          <Link href="/auth">Get Started Free</Link>
        </Button>
      </div>
      <div className=""></div>
    </section>
  );
}
