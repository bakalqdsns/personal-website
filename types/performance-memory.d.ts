// Augments the lib.dom Performance interface with the non-standard `memory`
// property available in Chromium-based browsers. The runtime code in
// components/perf/FpsMeter.tsx already guards against undefined values, so
// this declaration is purely a typing aid.

interface PerformanceMemory {
  readonly usedJSHeapSize: number;
  readonly totalJSHeapSize: number;
  readonly jsHeapSizeLimit: number;
}

interface Performance {
  memory?: PerformanceMemory;
}
