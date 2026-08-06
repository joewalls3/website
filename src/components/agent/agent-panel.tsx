"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";
import styles from "./agent-panel.module.css";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "I’m ready. Ask me to plan a project, troubleshoot a livestream setup, organize your priorities, or work through an idea.",
};

const SUGGESTED_PROMPTS = [
  "Help me prioritize what I should work on today.",
  "Plan a scalable architecture for one of my projects.",
  "Build me a livestream troubleshooting checklist.",
];

function createMessage(role: ChatRole, content: string): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
  };
}

export function AgentPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage(messageText: string) {
    const content = messageText.trim();
    if (!content || isLoading) return;

    const userMessage = createMessage("user", content);
    const requestMessages = [...messages, userMessage];
    const assistantMessage = createMessage("assistant", "");

    setMessages([...requestMessages, assistantMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: requestMessages.map(({ role, content: messageContent }) => ({
            role,
            content: messageContent,
          })),
        }),
      });

      if (!response.ok) {
        const errorBody = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(errorBody?.error ?? "The agent could not respond.");
      }

      if (!response.body) {
        throw new Error("The agent returned an empty response.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let completeText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        completeText += decoder.decode(value, { stream: true });
        setMessages((currentMessages) =>
          currentMessages.map((message) =>
            message.id === assistantMessage.id
              ? { ...message, content: completeText }
              : message,
          ),
        );
      }

      completeText += decoder.decode();
      if (!completeText.trim()) {
        throw new Error("The agent finished without returning text.");
      }

      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === assistantMessage.id
            ? { ...message, content: completeText }
            : message,
        ),
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "The agent could not respond.";

      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === assistantMessage.id
            ? { ...message, content: errorMessage }
            : message,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  }

  function clearConversation() {
    if (isLoading) return;
    setMessages([WELCOME_MESSAGE]);
    setInput("");
  }

  return (
    <section className={styles.panel} id="agent" aria-labelledby="agent-title">
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Private agent</p>
          <h2 id="agent-title">Joe’s command assistant</h2>
          <p className={styles.description}>
            Owner-only chat for planning, troubleshooting, writing, and technical work.
          </p>
        </div>
        <div className={styles.headerActions}>
          <span className={styles.status}>
            <span aria-hidden="true" /> Secure
          </span>
          <button
            className={styles.clearButton}
            type="button"
            onClick={clearConversation}
            disabled={isLoading}
          >
            Clear
          </button>
        </div>
      </header>

      <div className={styles.messages} aria-live="polite" aria-busy={isLoading}>
        {messages.map((message) => (
          <article
            className={`${styles.message} ${
              message.role === "user" ? styles.userMessage : styles.assistantMessage
            }`}
            key={message.id}
          >
            <span className={styles.messageLabel}>
              {message.role === "user" ? "You" : "Agent"}
            </span>
            <p className={styles.bubble}>
              {message.content || (isLoading ? "Thinking…" : "")}
            </p>
          </article>
        ))}
      </div>

      {messages.length === 1 ? (
        <div className={styles.suggestions} aria-label="Suggested prompts">
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              type="button"
              key={prompt}
              onClick={() => void sendMessage(prompt)}
              disabled={isLoading}
            >
              {prompt}
            </button>
          ))}
        </div>
      ) : null}

      <form className={styles.composer} onSubmit={handleSubmit}>
        <label className={styles.srOnly} htmlFor="agent-message">
          Message Joe’s agent
        </label>
        <textarea
          id="agent-message"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask the agent anything…"
          rows={3}
          maxLength={4_000}
          disabled={isLoading}
        />
        <div className={styles.composerFooter}>
          <span>Enter to send · Shift + Enter for a new line</span>
          <button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? "Working…" : "Send"}
          </button>
        </div>
      </form>
    </section>
  );
}
