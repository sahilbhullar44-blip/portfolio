"use client";

import { useState } from "react";
import Header from "./components/Header";
import ChipCard from "./components/ChipCard";
import Terminal from "./components/Terminal";
import { posts } from "./data";
import { Post } from "./types";
import "./styles.css";
import SectionBackground from "../components/SectionBackground";

export default function Netrunner() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <div className="netrunner-scope relative min-h-screen w-full overflow-hidden">
      <SectionBackground />

      <div className="container">
        <Header />

        <div className="pcb-grid">
          {posts.map((post) => (
            <ChipCard
              key={post.id}
              post={post}
              onClick={() => setSelectedPost(post)}
            />
          ))}
        </div>
      </div>

      {selectedPost && (
        <Terminal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
}
