import AuthTemplate from "../components/auth-template";

export default function AuthView() {
  return (
    <main className="flex flex-col items-center gap-14 w-full min-h-screen">
      <AuthTemplate
        title="Welcome to Clara."
        description="Sign in to manage your projects, or create an account to get
              started."
      />
    </main>
  );
}
