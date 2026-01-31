import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";

export default function CreateWorkspace() {
  return (
    <div className="w-full px-4 max-w-md">
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-semibold text-3xl text-center">Create Workspace</h1>
        <p className="text-sm text-muted-foreground text-center">
          This workspace will be the home for your projects, tasks, and
          collaboration.
        </p>
      </div>
      <form action="" className="mt-14">
        <div className="mb-5">
          <Label htmlFor="workspace-name" className="block mb-2.5">
            Workspace name
          </Label>
          <Input
            type="text"
            name="workspace-name"
            id="workspace-name"
            placeholder="Acme Inc."
            className="w-full"
          />
        </div>
        <div className="mb-8">
          <Label htmlFor="slug" className="block mb-2.5">
            Slug
          </Label>
          <Input
            type="text"
            name="slug"
            id="slug"
            placeholder="acme-inc"
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full">
          Create workspace
        </Button>
      </form>
    </div>
  );
}
