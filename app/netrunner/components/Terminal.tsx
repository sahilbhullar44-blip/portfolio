"use client";

import { useState } from "react";
import Image from "next/image";
import { Post } from "../types";
import { callGeminiAPI } from "../lib/gemini";
import styles from "./Terminal.module.css";

interface TerminalProps {
  post: Post | null;
  onClose: () => void;
}

export default function Terminal({ post, onClose }: TerminalProps) {
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  if (!post) return null;

  const handleSummarize = async () => {
    setLoading(true);
    setOutput(
      '<span style="animation: pulse-text 1s infinite;">>> PROCESSING NEURAL REQUEST...</span>'
    );

    try {
      const prompt = `Role: Cyberpunk AI. Task: Summarize "${post.title}". Context: ${post.content}. Tone: High-tech, brief, cool.`;
      const text = await callGeminiAPI(prompt);
      setOutput(`>> TRANSMISSION RECEIVED:\n${text}`);
    } catch (error) {
      setOutput(
        `>> ERROR: ${error instanceof Error ? error.message : "UNKNOWN_ERROR"}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuery = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setOutput(
      '<span style="animation: pulse-text 1s infinite;">>> PROCESSING NEURAL REQUEST...</span>'
    );

    try {
      const prompt = `Role: Cyberpunk AI. Topic: "${post.title}". User Question: "${query}". Tone: Helpful but robotic.`;
      const text = await callGeminiAPI(prompt);
      setOutput(`>> TRANSMISSION RECEIVED:\n${text}`);
    } catch (error) {
      setOutput(
        `>> ERROR: ${error instanceof Error ? error.message : "UNKNOWN_ERROR"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.terminalOverlay}>
      <div className={styles.crtMonitor}>
        <div className={styles.termScrollArea}>
          <div className={styles.termNav}>
            <span>&gt; CONNECTED_TO: SECURE_SERVER_09 [PORT:443]</span>
            <button className={styles.closeBtn} onClick={onClose}>
              X CLOSE
            </button>
          </div>

          <div className={styles.termGrid}>
            {/* HUD Sidebar */}
            <aside className={styles.termSidebar}>
              <div className={styles.sidebarHeader}>FILE_METADATA</div>

              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>DATA_IDENTIFIER</span>
                <span className={styles.metaValue}>{post.id}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>ENCRYPTION</span>
                <span
                  className={styles.metaValue}
                  style={{ color: "var(--neon-pink)" }}
                >
                  AES-256-GCM
                </span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>SIZE_ON_DISK</span>
                <span className={styles.metaValue}>{post.size}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>SOURCE_NODE</span>
                <span className={styles.metaValue}>{post.source}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>ACCESS_PERMISSIONS</span>
                <span
                  className={styles.metaValue}
                  style={{ color: "var(--neon-yellow)" }}
                >
                  [ ROOT_GRANTED ]
                </span>
              </div>

              {/* Animated Signal Viz */}
              <div className={styles.signalViz}>
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={styles.vizBar}></div>
                ))}
              </div>
            </aside>

            {/* Main Terminal Content */}
            <main className={styles.termMain}>
              <div className={styles.termTitleBlock}>
                <h2 className={styles.termTitle}>{post.title}</h2>
                <span className={styles.termBadge}>V.2.0</span>
              </div>

              <div className={styles.techFrame}>
                <Image
                  src={post.img}
                  className={styles.termImg}
                  alt={post.title}
                  width={600}
                  height={400}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>

              <p className={styles.termText}>{post.content}</p>

              {/* AI Command Console */}
              <div className={styles.consoleContainer}>
                <div className={styles.consoleBar}>
                  <span>CMD_PROMPT // AI_LINK_V4</span>
                  <span>[●] REC</span>
                </div>
                <div className={styles.consoleBody}>
                  <div className={styles.consoleControls}>
                    <button
                      className={styles.cmdBtn}
                      onClick={handleSummarize}
                      disabled={loading}
                    >
                      &gt; EXEC_SUMMARY
                    </button>
                  </div>
                  <div
                    className={styles.consoleControls}
                    style={{
                      borderBottom: "1px solid #333",
                      paddingBottom: "15px",
                    }}
                  >
                    <span
                      style={{ padding: "10px 0", color: "var(--neon-cyan)" }}
                    >
                      &gt;
                    </span>
                    <input
                      type="text"
                      className={styles.cmdInput}
                      placeholder="ENTER_QUERY..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAskQuery()}
                    />
                    <button
                      className={styles.cmdBtn}
                      onClick={handleAskQuery}
                      disabled={loading}
                    >
                      SEND
                    </button>
                  </div>
                  {output && (
                    <div
                      className={styles.consoleOutput}
                      dangerouslySetInnerHTML={{ __html: output }}
                    />
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
