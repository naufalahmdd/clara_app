import ClaraWordmark from "@/components/molecules/clara-wordmark";
import CreateWorkspace from "../components/create-workspace";

export default function OnboardingView() {
  return (
    <main className="flex flex-col items-center gap-14 w-full min-h-screen">
      <div className="flex justify-start w-full py-3 px-[7%]">
        <ClaraWordmark width={45} height={45} />
      </div>
      <div className="flex justify-center items-center w-full">
        <CreateWorkspace />
      </div>
    </main>
  );
}
