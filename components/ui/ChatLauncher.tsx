function AnimatedBotIcon() {
  return (
    <svg
      className="relative h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 7V4" />
      <path d="M8 4h8" />
      <rect width="16" height="12" x="4" y="8" rx="3" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <g className="chat-bot-eyes">
        <circle cx="9" cy="14" r="1.05" fill="currentColor" stroke="none" />
        <circle cx="15" cy="14" r="1.05" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export default function ChatLauncher() {
  return (
    <div className="pointer-events-none fixed bottom-24 left-0 z-[60] flex w-full justify-end px-6 sm:px-8 lg:justify-center lg:px-0">
      <div className="flex w-full justify-end lg:max-w-6xl lg:px-12">
        <button
          type="button"
          aria-label="Open chat"
          className="chat-launcher-button group pointer-events-auto relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-[0_14px_40px_rgba(20,99,255,0.3)] transition duration-200 hover:scale-110 hover:shadow-[0_18px_48px_rgba(20,99,255,0.36)] focus:outline-none focus-visible:scale-110 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:translate-x-24"
        >
          <span className="pointer-events-none absolute bottom-[calc(100%+0.75rem)] right-0 block translate-y-2 whitespace-nowrap rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-950 opacity-0 shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:text-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
            Have a chat with our agent
          </span>
          <AnimatedBotIcon />
        </button>
      </div>
    </div>
  );
}
