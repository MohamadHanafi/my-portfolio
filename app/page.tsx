import { Download, LayoutGrid } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-background px-4 font-sans">
      <main className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <h1 className="text-5xl font-black leading-none text-black sm:text-6xl lg:text-7xl dark:text-white">
          Hi, I&apos;m Mohamad Hanafi
        </h1>
        <p className="mt-5 text-2xl font-medium text-zinc-900 sm:text-3xl dark:text-zinc-100">
          Software Engineer | AI Integration Specialist
        </p>
        <p className="mt-10 max-w-3xl text-lg leading-snug text-zinc-800 sm:text-xl dark:text-zinc-200">
          I engineer intelligent systems that automate workflows, power user
          experiences, and leverage AI innovation.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Button
            href="/projects"
            icon={<LayoutGrid size={18} />}
            className="px-7 py-3 text-sm"
          >
            View Projects
          </Button>
          <Button
            variant="outlined"
            icon={<Download size={18} />}
            className="px-7 py-3 text-sm"
          >
            Download Resume
          </Button>
        </div>
      </main>
    </div>
  );
}
