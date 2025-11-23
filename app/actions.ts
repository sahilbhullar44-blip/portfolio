"use server";

import os from "os";

export async function getSystemSpecs() {
  try {
    const cpus = os.cpus();
    const model = cpus[0]?.model || "UNKNOWN CPU";
    // Clean up model name (remove speed, extra spaces)
    const cleanModel = model
      .replace(/\(R\)/g, "")
      .replace(/\(TM\)/g, "")
      .replace(/@.*/, "")
      .trim();
    
    const threads = cpus.length;
    
    return {
      cpuModel: cleanModel,
      threads: threads,
    };
  } catch (error) {
    return {
      cpuModel: "UNKNOWN SYSTEM",
      threads: 4,
    };
  }
}
