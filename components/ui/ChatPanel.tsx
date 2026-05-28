"use client";

import {
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronRight,
  LayoutPanelLeft,
  Maximize2,
  MessageCirclePlus,
  Mic,
  PanelRight,
  Plus,
  Send,
  Square,
  X,
} from "lucide-react";
import {
  ChatActionType,
  ChatConversationMode,
  type ChatRequestPayload,
  type ChatResponseAction,
  type ChatResponsePayload,
} from "@/app/lib/chat";

type ChatMode = "sidebar" | "floating" | "fullscreen";
type ChatStatus = "idle" | "loading";
type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const modeOptions: Array<{
  id: ChatMode;
  label: string;
  Icon: typeof PanelRight;
}> = [
  { id: "sidebar", label: "Sidebar", Icon: PanelRight },
  { id: "floating", label: "Floating", Icon: LayoutPanelLeft },
  { id: "fullscreen", label: "Full screen", Icon: Maximize2 },
];

function createSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getCurrentLocation() {
  if (typeof window === "undefined") {
    return "#home";
  }

  if (window.location.hash) {
    return window.location.hash;
  }

  const path = window.location.pathname.replace(/^\/|\/$/g, "");
  return path ? `#${path}` : "#home";
}

function getNavigationHref(target: string) {
  if (!target.startsWith("#")) {
    return target;
  }

  const page = target.slice(1);

  if (!page || page === "home") {
    return "/";
  }

  return `/${page}`;
}

function getPageContent() {
  if (typeof document === "undefined") {
    return "";
  }

  const pageShell =
    document.querySelector("[data-page-content]") ??
    document.querySelector(".portfolio-page-shell") ??
    document.querySelector("main");
  return pageShell?.textContent?.replace(/\s+/g, " ").trim() ?? "";
}

function attachPageContent(message: string) {
  const pageContent = getPageContent();

  if (!pageContent) {
    return message;
  }

  return `${message}\n\nPage content:\n${pageContent}`;
}

function AnimatedBotIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      className={`relative ${className}`}
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

function ModeIcon({ mode }: { mode: ChatMode }) {
  if (mode === "fullscreen") {
    return <Maximize2 className="h-4 w-4" aria-hidden="true" />;
  }

  if (mode === "floating") {
    return <LayoutPanelLeft className="h-4 w-4" aria-hidden="true" />;
  }

  return <PanelRight className="h-4 w-4" aria-hidden="true" />;
}

function LoadingResponse() {
  return (
    <div
      aria-live="polite"
      aria-label="Assistant is loading"
      className="mt-5 flex justify-start"
    >
      <div className="relative flex h-10 w-10 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-zinc-200 dark:border-zinc-800" />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-primary" />
        <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white text-primary shadow-[0_8px_24px_rgba(0,0,0,0.1)] dark:bg-zinc-950">
          <AnimatedBotIcon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

function MarkdownText({ content }: { content: string }) {
  const renderInline = (text: string) =>
    text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong
            key={index}
            className="font-semibold text-zinc-950 dark:text-zinc-50"
          >
            {part.slice(2, -2)}
          </strong>
        );
      }

      return <span key={index}>{part}</span>;
    });

  return (
    <div className="space-y-2 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
      {content.split("\n").map((line, index) => {
        if (line.trim().startsWith("- ")) {
          return (
            <div key={index} className="flex gap-2">
              <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
              <p>{renderInline(line.trim().slice(2))}</p>
            </div>
          );
        }

        return line.trim() ? <p key={index}>{renderInline(line)}</p> : null;
      })}
    </div>
  );
}

function MessageList({
  messages,
  chatStatus,
  messagesEndRef,
}: {
  messages: ChatMessage[];
  chatStatus: ChatStatus;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {messages.map((chatMessage) =>
        chatMessage.role === "user" ? (
          <div key={chatMessage.id} className="flex justify-end">
            <div className="max-w-[82%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-sm font-medium leading-relaxed text-white shadow-[0_8px_24px_rgba(20,99,255,0.18)]">
              {chatMessage.content}
            </div>
          </div>
        ) : (
          <div key={chatMessage.id} className="max-w-[92%]">
            <MarkdownText content={chatMessage.content} />
          </div>
        )
      )}

      {chatStatus === "loading" && <LoadingResponse />}
      <div ref={messagesEndRef} />
    </div>
  );
}

type ChatPanelProps = {
  isOpen: boolean;
  initialPrompt?: string | null;
  onClose: () => void;
  onInitialPromptHandled?: () => void;
};

export default function ChatPanel({
  isOpen,
  initialPrompt,
  onClose,
  onInitialPromptHandled,
}: ChatPanelProps) {
  const router = useRouter();
  const [mode, setMode] = useState<ChatMode>("sidebar");
  const [isModeMenuOpen, setIsModeMenuOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatStatus, setChatStatus] = useState<ChatStatus>("idle");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isPageContentAttached, setIsPageContentAttached] = useState(false);
  const [conversationMode, setConversationMode] = useState(
    ChatConversationMode.Chat
  );
  const activeRequestRef = useRef<AbortController | null>(null);
  const isUserAbortRef = useRef(false);
  const requestIdRef = useRef(0);
  const sessionIdRef = useRef(createSessionId());
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncScreenSize = () => setIsSmallScreen(mediaQuery.matches);

    syncScreenSize();
    mediaQuery.addEventListener("change", syncScreenSize);

    return () => mediaQuery.removeEventListener("change", syncScreenSize);
  }, []);

  useEffect(() => {
    return () => {
      activeRequestRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatStatus]);

  const activeMode = isSmallScreen ? "fullscreen" : mode;

  const panelClassName = useMemo(() => {
    const base =
      "pointer-events-auto fixed z-[70] flex flex-col overflow-hidden border border-zinc-200 bg-white text-zinc-950 shadow-[0_24px_90px_rgba(15,23,42,0.18)] transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50";

    if (activeMode === "fullscreen") {
      return `${base} inset-0 rounded-none`;
    }

    if (activeMode === "floating") {
      return `${base} bottom-5 right-5 h-[min(520px,calc(100vh-2.5rem))] w-[min(390px,calc(100vw-2.5rem))] rounded-[18px]`;
    }

    return `${base} bottom-0 right-0 top-0 w-[min(370px,100vw)] rounded-none border-y-0 border-r-0`;
  }, [activeMode]);

  const hasMessages = messages.length > 0;

  const contentClassName =
    activeMode === "fullscreen" && !hasMessages
      ? "mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col justify-center px-5 pb-8 pt-10 sm:px-8"
      : activeMode === "fullscreen"
        ? "mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col px-5 pb-8 pt-6 sm:px-8"
        : activeMode === "floating"
          ? "flex min-h-0 flex-1 flex-col px-3.5 pb-3.5 pt-3.5"
          : "flex min-h-0 flex-1 flex-col px-4 pb-4 pt-4";

  const hasMessage = message.trim().length > 0;
  const isProcessing = chatStatus !== "idle";

  const handleChatAction = useCallback(
    (action?: ChatResponseAction | null) => {
      if (!action) {
        return;
      }

      if (action.type === ChatActionType.StartContactFlow) {
        setConversationMode(ChatConversationMode.Contact);
        return;
      }

      if (action.type === ChatActionType.CompleteContactFlow) {
        setConversationMode(ChatConversationMode.Chat);
        return;
      }

      if (action.type !== ChatActionType.Navigate) {
        return;
      }

      const href = getNavigationHref(action.target);

      if (href.startsWith("/")) {
        router.push(href);
        return;
      }

      window.location.href = href;
    },
    [router]
  );

  const submitPrompt = useCallback(
    async (prompt: string) => {
      const submittedMessage = prompt.trim();

      if (!submittedMessage || isProcessing) {
        return;
      }

      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      isUserAbortRef.current = false;
      activeRequestRef.current?.abort();

      const abortController = new AbortController();
      activeRequestRef.current = abortController;
      const backendMessage = isPageContentAttached
        ? attachPageContent(submittedMessage)
        : submittedMessage;

      const payload: ChatRequestPayload = {
        message: backendMessage,
        session_id: sessionIdRef.current,
        mode: conversationMode,
        current_location: getCurrentLocation(),
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now(),
          role: "user",
          content: submittedMessage,
        },
      ]);
      setMessage("");
      setChatStatus("loading");

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          signal: abortController.signal,
        });

        const data = (await response.json()) as
          | ChatResponsePayload
          | { error?: string; detail?: unknown };

        if (!response.ok) {
          const errorMessage =
            "error" in data && data.error
              ? data.error
              : "The backend returned an error.";

          throw new Error(errorMessage);
        }

        if (requestIdRef.current !== requestId) {
          return;
        }

        const chatData = data as ChatResponsePayload;

        sessionIdRef.current = chatData.session_id || sessionIdRef.current;
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: Date.now() + 1,
            role: "assistant",
            content:
              chatData.reply ||
              "I got a response, but it did not include a reply.",
          },
        ]);
        handleChatAction(chatData.action);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          if (requestIdRef.current === requestId && isUserAbortRef.current) {
            setMessages((currentMessages) => [
              ...currentMessages,
              {
                id: Date.now() + 1,
                role: "assistant",
                content: "User aborted request.",
              },
            ]);
          }

          return;
        }

        if (requestIdRef.current !== requestId) {
          return;
        }

        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: Date.now() + 1,
            role: "assistant",
            content: "I am facing a network error. Could you please try again?",
          },
        ]);
        setMessage(submittedMessage);
      } finally {
        if (requestIdRef.current === requestId) {
          setChatStatus("idle");
          activeRequestRef.current = null;
          isUserAbortRef.current = false;
        }
      }
    },
    [conversationMode, handleChatAction, isPageContentAttached, isProcessing]
  );

  useEffect(() => {
    if (!initialPrompt) {
      return;
    }

    const initialPromptTimeout = setTimeout(() => {
      submitPrompt(initialPrompt);
      onInitialPromptHandled?.();
    }, 0);

    return () => clearTimeout(initialPromptTimeout);
  }, [initialPrompt, onInitialPromptHandled, submitPrompt]);

  function handleSubmitMessage() {
    submitPrompt(message);
  }

  function handleAbortRequest() {
    if (!activeRequestRef.current) {
      return;
    }

    isUserAbortRef.current = true;
    activeRequestRef.current.abort();
  }

  function handleStartNewChat() {
    requestIdRef.current += 1;
    isUserAbortRef.current = false;
    activeRequestRef.current?.abort();
    activeRequestRef.current = null;

    sessionIdRef.current = createSessionId();
    setMessages([]);
    setMessage("");
    setChatStatus("idle");
    setConversationMode(ChatConversationMode.Chat);
    setIsPageContentAttached(false);
    setIsModeMenuOpen(false);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <section
        aria-label="AI chat"
        className={panelClassName}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setIsModeMenuOpen(false);
            onClose();
          }
        }}
      >
        <header className="flex h-12 shrink-0 items-center justify-between gap-3 px-4">
          <div className="flex min-w-0 items-center gap-2">
            {hasMessages && (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-primary shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <AnimatedBotIcon className="h-4 w-4" />
              </div>
            )}
            <h2 className="truncate text-[15px] font-semibold tracking-normal">
              AI chat
            </h2>
            <span className="shrink-0 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-black uppercase leading-none tracking-normal text-primary">
              Beta
            </span>
          </div>

          <div className="relative flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label="Start new chat"
              disabled={!hasMessages}
              onClick={handleStartNewChat}
              className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent dark:text-zinc-300 dark:hover:bg-zinc-900 dark:disabled:hover:bg-transparent"
            >
              <MessageCirclePlus className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Change chat view"
              aria-expanded={isModeMenuOpen}
              disabled={isSmallScreen}
              onClick={() => setIsModeMenuOpen((value) => !value)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-45 dark:text-zinc-300 dark:hover:bg-zinc-900"
              title={
                isSmallScreen
                  ? "Full screen on small screens"
                  : "Change chat view"
              }
            >
              <ModeIcon mode={activeMode} />
            </button>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => {
                setIsModeMenuOpen(false);
                onClose();
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              {activeMode === "fullscreen" ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              )}
            </button>

            {isModeMenuOpen && !isSmallScreen && (
              <div className="absolute right-8 top-9 z-10 w-52 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-[0_18px_60px_rgba(15,23,42,0.18)] dark:border-zinc-800 dark:bg-zinc-950">
                {modeOptions.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setMode(id);
                      setIsModeMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-zinc-100 dark:hover:bg-zinc-900"
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="min-w-0 flex-1 truncate">{label}</span>
                    {activeMode === id && (
                      <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        <div className={contentClassName}>
          {!hasMessages ? (
            <div
              className={
                activeMode === "fullscreen"
                  ? "text-center"
                  : "mt-auto text-left"
              }
            >
              <div
                className={
                  activeMode === "fullscreen"
                    ? "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-zinc-200 bg-white text-primary shadow-[0_14px_36px_rgba(0,0,0,0.12)] dark:border-zinc-800 dark:bg-zinc-950"
                    : "mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white text-primary shadow-[0_12px_30px_rgba(0,0,0,0.12)] dark:border-zinc-800 dark:bg-zinc-950"
                }
              >
                <AnimatedBotIcon
                  className={
                    activeMode === "fullscreen" ? "h-8 w-8" : "h-6 w-6"
                  }
                />
              </div>

              <p
                className={
                  activeMode === "fullscreen"
                    ? "text-balance text-3xl font-extrabold tracking-normal text-zinc-900 dark:text-zinc-50 sm:text-4xl"
                    : "text-pretty text-base font-extrabold tracking-normal text-zinc-900 dark:text-zinc-50"
                }
              >
                Nice to meet you! How can I help?
              </p>
            </div>
          ) : (
            <MessageList
              messages={messages}
              chatStatus={chatStatus}
              messagesEndRef={messagesEndRef}
            />
          )}

          <div
            className={
              activeMode === "fullscreen"
                ? "mx-auto mt-10 w-full max-w-4xl"
                : activeMode === "floating"
                  ? "mt-5"
                  : "mt-7"
            }
          >
            <div
              className={
                activeMode === "floating"
                  ? "rounded-2xl border-2 border-primary bg-white p-2.5 shadow-[0_14px_42px_rgba(20,99,255,0.1)] dark:bg-zinc-950"
                  : "rounded-2xl border-2 border-primary bg-white p-3 shadow-[0_14px_42px_rgba(20,99,255,0.1)] dark:bg-zinc-950"
              }
            >
              <div className="mb-2 flex">
                <button
                  type="button"
                  aria-label={
                    isPageContentAttached
                      ? "Remove page content"
                      : "Attach page content"
                  }
                  aria-pressed={isPageContentAttached}
                  disabled={isProcessing}
                  onClick={() =>
                    setIsPageContentAttached((isAttached) => !isAttached)
                  }
                  className={`inline-flex h-6 max-w-full cursor-pointer items-center gap-1.5 rounded-full border px-2 text-[11px] font-black leading-none transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60 ${
                    isPageContentAttached
                      ? "border-primary bg-primary text-white"
                      : "border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-primary/40 hover:bg-primary/10 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-primary/15 dark:hover:text-zinc-50"
                  }`}
                  title={
                    isPageContentAttached
                      ? "Remove page content"
                      : "Attach page content"
                  }
                >
                  {isPageContentAttached ? (
                    <Check className="h-3 w-3 shrink-0" aria-hidden="true" />
                  ) : (
                    <Plus className="h-3 w-3 shrink-0" aria-hidden="true" />
                  )}
                  <span className="truncate">Page content</span>
                </button>
              </div>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSubmitMessage();
                  }
                }}
                placeholder="Ask any thing..."
                rows={activeMode === "fullscreen" ? 3 : 2}
                disabled={isProcessing}
                className={
                  activeMode === "floating"
                    ? "min-h-10 w-full resize-none bg-transparent text-sm font-semibold text-zinc-900 outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:opacity-60 dark:text-zinc-50"
                    : "min-h-12 w-full resize-none bg-transparent text-sm font-semibold text-zinc-900 outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:opacity-60 dark:text-zinc-50"
                }
              />
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                <button
                  type="button"
                  aria-label="Add attachment"
                  disabled
                  className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-full opacity-45 focus:outline-none"
                >
                  <Plus className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Use microphone"
                  disabled
                  className="ml-auto flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-full opacity-45 focus:outline-none"
                >
                  <Mic className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label={isProcessing ? "Stop response" : "Send message"}
                  disabled={!isProcessing && !hasMessage}
                  onClick={
                    isProcessing ? handleAbortRequest : handleSubmitMessage
                  }
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isProcessing
                      ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
                      : hasMessage
                        ? "bg-primary text-white hover:bg-primary/90"
                        : "cursor-not-allowed bg-zinc-100 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-600"
                  }`}
                >
                  {isProcessing ? (
                    <Square
                      className="h-3.5 w-3.5 fill-current"
                      aria-hidden="true"
                    />
                  ) : (
                    <Send className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
