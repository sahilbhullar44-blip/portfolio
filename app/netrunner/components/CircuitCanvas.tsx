"use client";

import { useEffect, useRef } from "react";

class Trace {
  x: number;
  y: number;
  size: number;
  speed: number;
  length: number;
  history: { x: number; y: number }[];
  w: number;
  h: number;

  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.x = 0;
    this.y = 0;
    this.size = 0;
    this.speed = 0;
    this.length = 0;
    this.history = [];
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.w;
    this.y = Math.random() * this.h;
    this.size = Math.random() * 2 + 1;
    this.speed = Math.random() * 2 + 0.5;
    this.length = Math.random() * 100 + 50;
    this.history = [];
  }

  update() {
    this.y += this.speed;
    this.history.push({ x: this.x, y: this.y });
    if (this.history.length > this.length) this.history.shift();
    if (this.y > this.h + 100) this.reset();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(0, 243, 255, ${0.1 + this.history.length / 200})`;
    ctx.lineWidth = 1;
    for (let i = 0; i < this.history.length; i++) {
      ctx.lineTo(this.history[i].x, this.history[i].y);
    }
    ctx.stroke();
  }
}

export default function CircuitCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let traces: Trace[] = [];
    let animationFrameId: number;

    function initTraces() {
      traces = [];
      for (let i = 0; i < 40; i++) traces.push(new Trace(w, h));
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, w, h);
      traces.forEach((t) => {
        t.update();
        t.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    }

    function resize() {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      initTraces();
    }

    window.addEventListener("resize", resize);
    initTraces();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id="circuit-canvas" />;
}
