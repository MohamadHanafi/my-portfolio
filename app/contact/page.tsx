import ContactChatButton from "@/components/ui/ContactChatButton";

export default function ContactPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-20 sm:px-12">
      <section className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <h1 className="text-4xl font-black leading-tight text-zinc-950 sm:text-5xl lg:text-6xl dark:text-zinc-50">
          Let&apos;s Work Together
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-800 sm:text-lg dark:text-zinc-200">
          I&apos;m always excited to collaborate, innovate, and build meaningful
          solutions. Whether you have a project, a job opportunity, or just want
          to connect, let&apos;s talk!
        </p>
        <ContactChatButton />
      </section>
    </main>
  );
}
