import type { CaseStudy } from "./caseStudy";

/** Case study for the Company Chatbot (Padi Bot), written from the project's source code. */
export const chatbot: CaseStudy = {
  title: "Padi Bot",
  subtitle: "A private, Persian-first AI chat assistant",
  tagline: "React · TypeScript · FastAPI · PostgreSQL · Ollama",
  builtFor: "Built for Padisar",
  overview: [
    "Padi Bot is a full-stack AI chat assistant for Padisar. People sign in, start conversations and get streamed answers from language models that run on the company's own machine through Ollama, so no conversation has to leave company infrastructure.",
    "I built both halves: a React and TypeScript chat client, and a FastAPI backend that handles accounts, conversation history, model routing and the streaming pipeline.",
  ],
  problemTitle: "Goals & constraints",
  problem: {
    intro:
      "The assistant had to be useful every day, not just impressive in a demo. That set a few firm requirements:",
    points: [
      "Persian first: right-to-left text, answers in the right language, and clean handling of mixed Persian and English.",
      "Private by default: models run on company hardware, with no third-party AI API in the path.",
      "Real accounts and history: each person has their own conversations, with search, rename and delete.",
      "Runs on modest hardware: it should work on a CPU-only machine and recover if a GPU runner crashes.",
      "Readable answers from reasoning models: a model's long internal reasoning must not clutter the reply.",
    ],
  },
  solutionTitle: "The approach",
  solution:
    "A React client talks to a FastAPI backend over a cookie-authenticated API. The backend stores every conversation in PostgreSQL, builds a trimmed history and a language-aware system prompt for each turn, and streams the model's reply from Ollama back to the browser as server-sent events, including small control frames for the model name, reasoning text, errors and cancellation.",
  screens: [
    {
      src: "/case-studies/chatbot/chat.png",
      alt: "Padi Bot conversation view with a reply-to quote, sidebar history and model picker",
      caption:
        "Conversation view: right-to-left messages, reply-to-message quotes, searchable history in the sidebar and a model picker in the composer.",
      wide: true,
    },
    {
      src: "/case-studies/chatbot/welcome.png",
      alt: "Padi Bot welcome screen with a Persian greeting",
      caption: "Welcome state: a Persian greeting and a short summary of what the assistant offers.",
    },
    {
      src: "/case-studies/chatbot/login.png",
      alt: "Padi Bot sign-in screen",
      caption: "Sign-in: email and password, with SMS-based password recovery.",
    },
    {
      src: "/case-studies/chatbot/mobile.png",
      alt: "Padi Bot on a phone, with the sidebar open as a drawer",
      caption: "On mobile the sidebar becomes a slide-over drawer.",
      wide: true,
      portrait: true,
    },
  ],
  screensNote:
    "Screens from the product. The conversations shown are examples, not live customer chats.",
  features: [
    {
      group: "Conversation experience",
      items: [
        {
          title: "Live streaming replies",
          text: "Tokens appear as they are generated over server-sent events. A stop button cancels on the server too, aborting the Ollama stream.",
        },
        {
          title: "Two models, one picker",
          text: "Gemma 3 and Qwen3 (4B) can be chosen per message, and the model used is saved with each reply.",
        },
        {
          title: "Reply to a message",
          text: "Quote an earlier message. The quote is stored with the message and passed to the model so it knows what is being referred to.",
        },
        {
          title: "Collapsible reasoning",
          text: "For reasoning models, the thinking is separated from the answer and shown in a collapsible panel instead of the reply.",
        },
        {
          title: "RTL by content",
          text: "Text direction and alignment are chosen per message from its content, so Persian and English both read correctly.",
        },
        {
          title: "Dark and light themes",
          text: "Dark by default, with a one-click theme toggle.",
        },
      ],
    },
    {
      group: "Accounts & history",
      items: [
        {
          title: "Registration and login",
          text: "Sign up with email and an Iranian mobile number. Passwords are hashed with Argon2, and a signed token lives in an httpOnly cookie for seven days.",
        },
        {
          title: "Conversation management",
          text: "Create, list (with a preview line), search, rename and delete conversations. Every request checks the conversation belongs to the signed-in user.",
        },
        {
          title: "SMS password recovery",
          text: "A six-digit one-time code, stored hashed, expiring after 15 minutes, limited to one request per 24 hours, with the phone number masked in responses.",
        },
        {
          title: "Resume after refresh",
          text: "Partial replies are saved as drafts while streaming, and the client polls so a reload or dropped connection picks the answer back up.",
        },
      ],
    },
    {
      group: "Reliability & output quality",
      items: [
        {
          title: "Language-aware prompting",
          text: "The backend detects whether the latest message is Persian and adjusts the system prompt to match.",
        },
        {
          title: "Output cleanup",
          text: "Filters remove leaked instructions, English meta-commentary and chain-of-thought fragments, including think tags split across streamed chunks.",
        },
        {
          title: "Answer recovery",
          text: "If a reasoning model spends its budget thinking and returns no answer, the backend extracts one or retries with a direct, non-thinking request.",
        },
        {
          title: "Hardware fallbacks",
          text: "A CPU-only configuration with tunable context, threads and keep-alive. If a CUDA runner crashes, the request is retried on CPU.",
        },
      ],
    },
  ],
  architecture: [
    {
      title: "React client",
      tech: "React 18 · TypeScript",
      text: "Chat UI, sidebar and auth pages. Reads the event stream and separates reasoning from the answer as chunks arrive.",
    },
    {
      title: "FastAPI backend",
      tech: "FastAPI",
      text: "Auth, sessions and history. Builds the prompt, proxies the stream, saves drafts and handles cancellation.",
    },
    {
      title: "Ollama runtime",
      tech: "Gemma 3 · Qwen3",
      text: "Self-hosted model runtime on company hardware, with CPU-only model aliases and keep-alive tuning.",
    },
    {
      title: "PostgreSQL",
      tech: "SQLAlchemy",
      text: "Users, chat sessions and messages, including which model produced each reply.",
    },
  ],
  architectureNote:
    "The stream between the backend and the browser carries plain text plus small control frames — [MODEL], [THINK], [FINAL], [ERROR], [CANCELLED] and [DONE] — so the client can show reasoning separately and react to stops and failures. Schema additions are applied idempotently at startup.",
  highlights: [
    { area: "Frontend", text: "React 18, TypeScript and Vite, styled with Tailwind CSS and shadcn/ui on Radix, with React Router and TanStack Query." },
    { area: "Backend", text: "FastAPI with SQLAlchemy models and async httpx streaming to Ollama, plus a startup guard that adds missing columns safely." },
    { area: "Auth", text: "Argon2 password hashing, a signed JWT in an httpOnly SameSite cookie, and an active-account check on every request." },
    { area: "Streaming", text: "Server-sent events with control frames. Generation IDs and cancel events stop a stale stream from overwriting a newer one." },
    { area: "AI runtime", text: "Ollama chat API with per-model options, Gemma 3 and Qwen3 4B, and CPU-only model aliases created by a setup script." },
    { area: "Data", text: "PostgreSQL tables for users, chat sessions and chat messages, with cascade deletes and a unique index on phone numbers." },
  ],
  challenges: [
    {
      title: "Making reasoning models usable",
      text: "Qwen3 emits long chain-of-thought text. I built a streaming splitter that handles tags cut across chunks, routes the reasoning to its own panel, and added backend filters and a retry for replies that contain only thinking.",
    },
    {
      title: "Persian-first quality",
      text: "Language detection, a prompt that adapts to the user's language, Persian-only cleanup of replies and per-message RTL layout keep answers natural for Persian speakers.",
    },
    {
      title: "Running on modest hardware",
      text: "A CPU-only mode, a bounded context window, keep-alive tuning and an automatic CPU retry when a CUDA runner crashes keep the assistant available without a strong GPU.",
    },
    {
      title: "Stopping generation properly",
      text: "A stop button that only hides the output wastes compute. Cancel events abort the active Ollama stream and unload the runner so the next message starts clean.",
    },
    {
      title: "Surviving refreshes and dropped connections",
      text: "Draft replies are saved while streaming and the client polls the session, so a reload does not lose the answer in progress.",
    },
    {
      title: "Account recovery without an email service",
      text: "SMS one-time codes with hashing, expiry, a 24-hour cooldown and number masking give a safe reset flow through an internal gateway.",
    },
  ],
  stack: [
    "React",
    "TypeScript",
    "Vite",
    "Tailwind CSS",
    "shadcn/ui",
    "FastAPI",
    "SQLAlchemy",
    "PostgreSQL",
    "Ollama",
    "Gemma 3",
    "Qwen3",
    "Server-Sent Events",
    "JWT",
    "Argon2",
  ],
  outcome:
    "Padi Bot gives people at Padisar a private, Persian-friendly AI assistant with real accounts and saved conversations, running on models the company hosts itself, and it recovers when a model rambles, a GPU runner crashes or a tab refreshes mid-answer.",
};
