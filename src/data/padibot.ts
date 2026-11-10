import type { CaseStudy } from "./caseStudy";

/** Case study content for the AI Customer Service Plugin (Padibot), condensed from the case-study PDF. */

export const padibot: CaseStudy = {
  title: "Padibot",
  subtitle: "A Persian-language AI chat assistant for WordPress",
  tagline: "WordPress plugin · PHP · JavaScript · LLM gateway",
  builtFor: "Built for Padisar Informatics",
  pdf: "/case-studies/padibot-case-study.pdf",
  liveUrl: "https://padisarco.ir",
  overview: [
    "Padibot is a WordPress plugin that adds a branded, right-to-left AI assistant to a company website. Visitors ask questions in Persian, and the bot answers in real time, in a formal and concise tone, using only the company's approved knowledge. It also captures leads, collects feedback, and hands people over to a human when the bot can't help.",
    "I built it end to end: the chat widget, the retrieval and guardrail logic, the streaming pipeline, the data layer, and the admin dashboards.",
  ],
  problem: {
    intro:
      "A company website needs to answer visitor questions around the clock without a human on every chat. Off-the-shelf chatbots fall short for a Persian-language business site in several ways:",
    points: [
      "Right-to-left layout, Persian typography and the Jalali (Persian) calendar are usually poor or missing.",
      "General-purpose LLMs drift off-topic, invent facts, or slip into other languages.",
      "Sales teams need contact details from visitors, not just conversation logs.",
      "Running costs and data privacy matter, so the model should sit on infrastructure the company controls.",
    ],
  },
  solution:
    "Padibot keeps the WordPress plugin thin and puts control where it belongs. The plugin handles the interface, knowledge retrieval, memory, and analytics. A self-hosted LLM gateway (OpenAI-compatible, running a Gemma 3 model by default) generates the answers and streams them back token by token.",
  features: [
    {
      group: "Conversation experience",
      items: [
        {
          title: "Live streaming replies",
          text: "Answers appear as they are generated, through a dedicated streaming endpoint that bypasses WordPress's usual response buffering.",
        },
        {
          title: "Floating RTL widget",
          text: "Greeting tooltip, branded header and avatar, conversation-starter chips, and full RTL/Persian styling with the Vazirmatn font.",
        },
        {
          title: "Reply-to-message",
          text: "Visitors can reply to a specific earlier message, and the bot understands what is being referred to.",
        },
        {
          title: "Conversation memory",
          text: "The last several turns are kept, along with lightweight facts the visitor mentions (name, location, occupation, company).",
        },
      ],
    },
    {
      group: "Accuracy & guardrails",
      items: [
        {
          title: "Curated knowledge base",
          text: "About 78 structured entries from the official brand book and an FAQ, each with tags, sample questions, an approved answer and a call to action.",
        },
        {
          title: "Intent-aware retrieval",
          text: "Keyword scoring with synonym expansion, tag matching, follow-up detection and relevance thresholds. Only matched sections are sent to the model, not whole documents.",
        },
        {
          title: "Strict system rules",
          text: "Answers only about the company's services, in Persian only, with no invented facts. When it does not know, it directs the visitor to the company's specialists.",
        },
        {
          title: "Output cleanup",
          text: "Filters remove repetition loops, fix broken Persian encoding, normalise Persian characters and strip stray non-Persian words.",
        },
      ],
    },
    {
      group: "Business tools",
      items: [
        {
          title: "Lead capture",
          text: "A pre-chat form collects name and mobile number with a consent message. Phone numbers are unique, and returning visitors are recognised by a device cookie.",
        },
        {
          title: "Human hand-off",
          text: "Phone, WhatsApp, Telegram, Bale and Eitaa buttons, plus a \"request a callback\" form.",
        },
        {
          title: "Business hours & feedback",
          text: "After-hours notice evaluated in the browser so it stays correct on cached pages, plus thumbs up/down on each answer.",
        },
        {
          title: "Unanswered-question log",
          text: "Every question the bot could not answer is recorded, so each miss becomes a to-do for the knowledge base.",
        },
        {
          title: "Rate limiting",
          text: "Per-visitor, per-minute and per-hour limits, plus a looser per-IP ceiling for shared office networks, protect the GPU server.",
        },
        {
          title: "Admin dashboards",
          text: "Insights, leads and full transcripts with CSV export, Jalali date filters, a settings page and an LLM connection diagnostic.",
        },
      ],
    },
  ],
  architecture: [
    { title: "Widget", tech: "JavaScript", text: "Captures the message, shows the typing state and renders the streamed reply." },
    { title: "Streaming endpoint", tech: "PHP", text: "Boots WordPress and passes the request on with response buffering switched off." },
    {
      title: "Chat engine",
      tech: "PHP",
      text: "Checks rate limits, loads memory, finds matching knowledge, builds the prompt, calls the gateway and cleans the text as it streams back.",
    },
    {
      title: "LLM gateway",
      tech: "OpenAI-compatible",
      text: "A stateless service that only receives the message list. All memory and business logic stay in WordPress.",
    },
  ],
  architectureNote:
    "Data is stored in custom MySQL tables for leads, chats, conversations, messages, memory facts, feedback, unanswered questions and callbacks. A startup guard checks that all files are present and shows a clear admin notice instead of crashing the site.",
  highlights: [
    { area: "Backend", text: "PHP 7.4+, a WordPress plugin split into focused classes: chat, knowledge, conversation, leads, feedback, settings, indexer and Jalali." },
    { area: "Frontend", text: "Vanilla JavaScript widget with a streaming reader, RTL layout, and inline SVG icons that work even on hosts that block .svg files." },
    { area: "AI integration", text: "OpenAI-compatible and Ollama protocols, SSE streaming, automatic endpoint repair and detailed connection error messages." },
    { area: "Retrieval", text: "Custom keyword and intent scoring tuned for Persian, with synonym expansion and confidence levels." },
    { area: "Privacy", text: "Chats go from the company's WordPress server to its own LLM server, with no third-party AI service in the path." },
    { area: "Localisation", text: "Persian UI throughout, Persian and English digit handling, and a native Jalali date library." },
  ],
  challenges: [
    {
      title: "Streaming on shared WordPress hosting",
      text: "admin-ajax buffers output, so I added a standalone streaming endpoint with buffering disabled at several layers.",
    },
    {
      title: "Keeping a small model on-topic",
      text: "I combined tight system rules, section-level retrieval and post-generation filters instead of trusting the model alone.",
    },
    {
      title: "Persian text quality",
      text: "I added filters for broken encoding, character normalisation and repetition loops.",
    },
    {
      title: "Knowing what the bot can't do",
      text: "Logging unanswered questions turns every miss into a to-do item for the knowledge base.",
    },
    {
      title: "Protecting the server",
      text: "Layered rate limits handle both individual abuse and legitimate shared networks.",
    },
  ],
  stack: [
    "PHP",
    "WordPress plugin API",
    "MySQL",
    "JavaScript (ES6)",
    "CSS",
    "Server-Sent Events",
    "OpenAI-compatible API",
    "Ollama",
    "Gemma 3",
    "Jalali calendar",
  ],
  outcome:
    "Padibot gives a Persian-language business site an assistant that sounds like the brand, stays on topic, captures qualified leads, and routes people to a human when needed, while keeping all conversation data on infrastructure the company controls.",
};
