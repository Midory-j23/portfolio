"use client";

import { useState } from "react";
import { isPerfLite } from "@/lib/perf";

export function usePerfLite(): boolean {
  return useState(isPerfLite)[0];
}